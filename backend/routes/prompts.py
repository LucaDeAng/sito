from fastapi import APIRouter, HTTPException, status, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from datetime import datetime

from models import Prompt, PromptCreate, PromptUpdate

router = APIRouter(prefix="/prompts", tags=["prompts"])

@router.post("/", response_model=Prompt, status_code=status.HTTP_201_CREATED)
async def create_prompt(prompt_data: PromptCreate, db: AsyncIOMotorDatabase = None):
    # Create new prompt
    new_prompt = Prompt(**prompt_data.dict())
    await db.prompts.insert_one(new_prompt.dict())
    return new_prompt

@router.get("/", response_model=List[Prompt])
async def get_prompts(
    category: Optional[str] = None,
    tag: Optional[str] = None,
    limit: int = Query(10, ge=1, le=100),
    skip: int = Query(0, ge=0),
    sort_by: str = "created_at",
    sort_order: int = -1,  # -1 for descending, 1 for ascending
    db: AsyncIOMotorDatabase = None
):
    # Build query filters
    query = {}
    if category:
        query["category"] = category
    if tag:
        query["tags"] = tag
        
    # Get prompts with sorting and pagination
    cursor = db.prompts.find(query)
    
    # Apply sorting
    if sort_by in ["created_at", "likes", "views", "title"]:
        cursor = cursor.sort(sort_by, sort_order)
    else:
        cursor = cursor.sort("created_at", -1)  # Default sort
    
    # Apply pagination
    cursor = cursor.skip(skip).limit(limit)
    
    prompts = await cursor.to_list(limit)
    return [Prompt(**prompt) for prompt in prompts]

@router.get("/{prompt_id}", response_model=Prompt)
async def get_prompt(prompt_id: str, db: AsyncIOMotorDatabase = None):
    # Increment views
    await db.prompts.update_one(
        {"id": prompt_id},
        {"$inc": {"views": 1}}
    )
    
    prompt = await db.prompts.find_one({"id": prompt_id})
    if not prompt:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prompt not found"
        )
    
    return Prompt(**prompt)

@router.put("/{prompt_id}", response_model=Prompt)
async def update_prompt(
    prompt_id: str, 
    prompt_update: PromptUpdate,
    db: AsyncIOMotorDatabase = None
):
    # Filter out None values
    update_data = {k: v for k, v in prompt_update.dict().items() if v is not None}
    
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update"
        )
    
    # Add updated_at timestamp
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.prompts.update_one(
        {"id": prompt_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prompt not found"
        )
    
    updated = await db.prompts.find_one({"id": prompt_id})
    return Prompt(**updated)

@router.post("/{prompt_id}/like", response_model=Prompt)
async def like_prompt(prompt_id: str, db: AsyncIOMotorDatabase = None):
    # Increment likes
    result = await db.prompts.update_one(
        {"id": prompt_id},
        {"$inc": {"likes": 1}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prompt not found"
        )
    
    updated = await db.prompts.find_one({"id": prompt_id})
    return Prompt(**updated)

@router.delete("/{prompt_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prompt(prompt_id: str, db: AsyncIOMotorDatabase = None):
    result = await db.prompts.delete_one({"id": prompt_id})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prompt not found"
        )
    
    return None