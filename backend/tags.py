from fastapi import APIRouter, HTTPException, status, Query, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional

# Assuming a get_db dependency for database connection, and get_current_active_user for auth
# from ..dependencies import get_db, get_current_active_user, User # User for role checks
from ..models import Tag, TagCreate, TagUpdate, UserRole, User # User and UserRole for permission checks

router = APIRouter(prefix="/tags", tags=["tags"])

# Placeholder for database dependency
async def get_db_placeholder():
    pass

# Placeholder for current user dependency
async def get_current_user_placeholder():
    # Mock admin user for permission-requiring operations
    return User(id="mock_admin_id", username="mockadmin", email="admin@example.com", role=UserRole.ADMIN, password_hash="hashed")

@router.post("/", response_model=Tag, status_code=status.HTTP_201_CREATED)
async def create_tag(
    tag_data: TagCreate,
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_user: User = Depends(get_current_user_placeholder) # Ensure only admin/editor can create
):
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create tags")

    # Check if tag with same name and type already exists
    existing_tag = await db.tags.find_one({"name": tag_data.name, "type": tag_data.type})
    if existing_tag:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Tag 
        {tag_data.name}
         already exists for type 
        {tag_data.type}
        ")

    new_tag = Tag(**tag_data.dict())
    await db.tags.insert_one(new_tag.dict())
    return new_tag

@router.get("/", response_model=List[Tag])
async def get_tags(
    type: Optional[str] = None, # Filter by 'blog' or 'prompt'
    limit: int = Query(100, ge=1, le=500),
    skip: int = Query(0, ge=0),
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder)
):
    query = {}
    if type:
        query["type"] = type
    
    cursor = db.tags.find(query).skip(skip).limit(limit)
    tags = await cursor.to_list(limit)
    return [Tag(**t) for t in tags]

@router.get("/{tag_id}", response_model=Tag)
async def get_tag(tag_id: str, db: AsyncIOMotorDatabase = Depends(get_db_placeholder)):
    tag = await db.tags.find_one({"id": tag_id})
    if not tag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tag not found"
        )
    return Tag(**tag)

@router.put("/{tag_id}", response_model=Tag)
async def update_tag(
    tag_id: str,
    tag_update: TagUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_user: User = Depends(get_current_user_placeholder) # Ensure only admin/editor can update
):
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update tags")

    update_data = {k: v for k, v in tag_update.dict(exclude_unset=True).items() if v is not None}

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update"
        )

    # Check for name collision if name is being updated
    if "name" in update_data:
        current_tag = await db.tags.find_one({"id": tag_id})
        if current_tag:
            existing_tag = await db.tags.find_one({"name": update_data["name"], "type": current_tag["type"], "id": {"$ne": tag_id}})
            if existing_tag:
                 raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Tag name 
                 {update_data['name']}
                  already exists for type 
                 {current_tag['type']}
                 ")
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tag not found")

    result = await db.tags.update_one(
        {"id": tag_id},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        existing_t = await db.tags.find_one({"id": tag_id})
        if not existing_t:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tag not found"
            )

    updated_tag = await db.tags.find_one({"id": tag_id})
    if not updated_tag:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tag not found after update attempt")
    return Tag(**updated_tag)

@router.delete("/{tag_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_tag(
    tag_id: str, 
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_user: User = Depends(get_current_user_placeholder) # Ensure only admin/editor can delete
):
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete tags")

    # Deleting a tag might mean removing it from posts/prompts or just deleting the tag itself.
    # For now, just deleting the tag. If tags are stored as strings in posts/prompts, they remain.
    # If using a join table, those entries would need cleanup.

    result = await db.tags.delete_one({"id": tag_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tag not found"
        )
    return None

