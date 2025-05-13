from fastapi import APIRouter, HTTPException, status, Query, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from datetime import datetime

# Assuming a get_db dependency for database connection, and get_current_active_user for auth
# These would need to be defined in your main app or a common dependencies file.
# For now, I'll use placeholder comments for where they'd be used.
# from ..dependencies import get_db, get_current_active_user, User
from ..models import BlogPost, BlogPostCreate, BlogPostUpdate, ContentStatus, User # User needed for author_id

router = APIRouter(prefix="/blog", tags=["blog"])

# Placeholder for database dependency - in a real app, this comes from main.py or deps.py
async def get_db_placeholder():
    # This would be your actual database connection logic, e.g., from a global var or context
    # For now, let's assume it's passed some other way or mocked for route definition
    # In the original prompts.py, it was passed as a default arg to the route function
    # which is not standard FastAPI dependency injection. Let's assume a proper Depends is used.
    pass

# Placeholder for current user dependency
async def get_current_user_placeholder():
    # This would be your actual authentication logic
    # For now, returning a mock user
    return User(id="mock_user_id", username="mockuser", email="user@example.com", role="author", password_hash="hashed")

@router.post("/", response_model=BlogPost, status_code=status.HTTP_201_CREATED)
async def create_blog_post(
    post_data: BlogPostCreate,
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder), # Replace with actual get_db
    current_user: User = Depends(get_current_user_placeholder) # Replace with actual get_current_active_user
):
    new_post_data = post_data.dict()
    new_post_data["author_id"] = current_user.id
    # Ensure slug is unique if not provided or generate one
    # For now, assuming slug is provided and unique handling is elsewhere or not critical for this step
    
    new_post = BlogPost(**new_post_data)
    # await db.blog_posts.insert_one(new_post.dict(by_alias=True)) # by_alias if using Field aliases
    await db.blog_posts.insert_one(new_post.dict())
    return new_post

@router.get("/", response_model=List[BlogPost])
async def get_blog_posts(
    category_id: Optional[str] = None,
    tag: Optional[str] = None,
    author_id: Optional[str] = None,
    status: Optional[ContentStatus] = None,
    limit: int = Query(10, ge=1, le=100),
    skip: int = Query(0, ge=0),
    sort_by: str = "created_at",
    sort_order: int = -1,  # -1 for descending, 1 for ascending
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder)
):
    query = {}
    if category_id:
        query["category_id"] = category_id
    if tag:
        query["tags"] = tag # Assumes tags is an array and we're looking for exact match in array
    if author_id:
        query["author_id"] = author_id
    if status:
        query["status"] = status.value

    cursor = db.blog_posts.find(query)

    if sort_by in ["created_at", "published_at", "updated_at", "title", "read_time_minutes"]:
        cursor = cursor.sort(sort_by, sort_order)
    else:
        cursor = cursor.sort("created_at", -1)

    cursor = cursor.skip(skip).limit(limit)
    posts = await cursor.to_list(limit)
    return [BlogPost(**post) for post in posts]

@router.get("/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str, db: AsyncIOMotorDatabase = Depends(get_db_placeholder)):
    post = await db.blog_posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    return BlogPost(**post)

@router.put("/{post_id}", response_model=BlogPost)
async def update_blog_post(
    post_id: str,
    post_update: BlogPostUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_user: User = Depends(get_current_user_placeholder)
):
    # Add authorization: only author or editor/admin can update
    # post = await db.blog_posts.find_one({"id": post_id})
    # if not post or (post["author_id"] != current_user.id and current_user.role not in ["editor", "admin"]):
    #     raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this post")

    update_data = {k: v for k, v in post_update.dict(exclude_unset=True).items() if v is not None}

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update"
        )

    update_data["updated_at"] = datetime.utcnow()
    if "status" in update_data and update_data["status"] == ContentStatus.PUBLISHED.value:
        if "published_at" not in update_data or update_data["published_at"] is None:
             update_data["published_at"] = datetime.utcnow()

    result = await db.blog_posts.update_one(
        {"id": post_id},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        # Check if the document exists to differentiate between not found and no actual change
        existing_post = await db.blog_posts.find_one({"id": post_id})
        if not existing_post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog post not found"
            )
        # If it exists but wasn't modified, it might be an update with same values or an issue
        # For now, we assume it's okay and return the current state

    updated_post = await db.blog_posts.find_one({"id": post_id})
    if not updated_post:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found after update attempt")
    return BlogPost(**updated_post)

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog_post(
    post_id: str, 
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_user: User = Depends(get_current_user_placeholder)
):
    # Add authorization: only author or editor/admin can delete
    # post = await db.blog_posts.find_one({"id": post_id})
    # if not post or (post["author_id"] != current_user.id and current_user.role not in ["editor", "admin"]):
    #     raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this post")

    result = await db.blog_posts.delete_one({"id": post_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    return None

# Additional routes for status changes (e.g., submit_for_review, approve_post) would go here
# These would typically be POST requests to a sub-resource or a dedicated action endpoint
# Example:
# @router.post("/{post_id}/submit_review", response_model=BlogPost)
# async def submit_post_for_review(post_id: str, db: AsyncIOMotorDatabase = Depends(get_db_placeholder), current_user: User = Depends(get_current_user_placeholder)):
#     # Logic to change status to PENDING_REVIEW, check permissions etc.
#     pass

