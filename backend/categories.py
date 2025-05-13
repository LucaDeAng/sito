from fastapi import APIRouter, HTTPException, status, Query, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional

# Assuming a get_db dependency for database connection, and get_current_active_user for auth
# from ..dependencies import get_db, get_current_active_user, User # User for role checks
from ..models import Category, CategoryCreate, CategoryUpdate, UserRole, User # User and UserRole for permission checks

router = APIRouter(prefix="/categories", tags=["categories"])

# Placeholder for database dependency
async def get_db_placeholder():
    pass

# Placeholder for current user dependency
async def get_current_user_placeholder():
    # Mock admin user for permission-requiring operations
    return User(id="mock_admin_id", username="mockadmin", email="admin@example.com", role=UserRole.ADMIN, password_hash="hashed")

@router.post("/", response_model=Category, status_code=status.HTTP_201_CREATED)
async def create_category(
    category_data: CategoryCreate,
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_user: User = Depends(get_current_user_placeholder) # Ensure only admin/editor can create
):
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create categories")
    
    # Check if category with same name and type already exists
    existing_category = await db.categories.find_one({"name": category_data.name, "type": category_data.type})
    if existing_category:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Category 
        {category_data.name}
         already exists for type 
        {category_data.type}
        ")

    new_category = Category(**category_data.dict())
    await db.categories.insert_one(new_category.dict())
    return new_category

@router.get("/", response_model=List[Category])
async def get_categories(
    type: Optional[str] = None, # Filter by 'blog' or 'prompt'
    limit: int = Query(50, ge=1, le=200),
    skip: int = Query(0, ge=0),
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder)
):
    query = {}
    if type:
        query["type"] = type
    
    cursor = db.categories.find(query).skip(skip).limit(limit)
    categories = await cursor.to_list(limit)
    return [Category(**cat) for cat in categories]

@router.get("/{category_id}", response_model=Category)
async def get_category(category_id: str, db: AsyncIOMotorDatabase = Depends(get_db_placeholder)):
    category = await db.categories.find_one({"id": category_id})
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    return Category(**category)

@router.put("/{category_id}", response_model=Category)
async def update_category(
    category_id: str,
    category_update: CategoryUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_user: User = Depends(get_current_user_placeholder) # Ensure only admin/editor can update
):
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update categories")

    update_data = {k: v for k, v in category_update.dict(exclude_unset=True).items() if v is not None}

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update"
        )
    
    # Check for name collision if name is being updated
    if "name" in update_data:
        current_category = await db.categories.find_one({"id": category_id})
        if current_category:
            existing_category = await db.categories.find_one({"name": update_data["name"], "type": current_category["type"], "id": {"$ne": category_id}})
            if existing_category:
                 raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Category name 
                 {update_data['name']}
                  already exists for type 
                 {current_category['type']}
                 ")
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")


    result = await db.categories.update_one(
        {"id": category_id},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        existing_cat = await db.categories.find_one({"id": category_id})
        if not existing_cat:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found"
            )

    updated_category = await db.categories.find_one({"id": category_id})
    if not updated_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found after update attempt")
    return Category(**updated_category)

@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    category_id: str, 
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_user: User = Depends(get_current_user_placeholder) # Ensure only admin/editor can delete
):
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete categories")

    # Consider implications: what happens to posts/prompts using this category?
    # Option 1: Disallow deletion if in use
    # Option 2: Set category_id to null in posts/prompts
    # For now, simple deletion. Add checks if needed.
    # blog_posts_using_category = await db.blog_posts.count_documents({"category_id": category_id})
    # prompts_using_category = await db.prompts.count_documents({"category_id": category_id})
    # if blog_posts_using_category > 0 or prompts_using_category > 0:
    #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category is in use and cannot be deleted")

    result = await db.categories.delete_one({"id": category_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    return None

