from fastapi import APIRouter, HTTPException, status, Query, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional

# Assuming a get_db dependency for database connection, and get_current_active_user for auth
# from ..dependencies import get_db, get_current_active_user, User, UserCreate, UserUpdate, UserRole
# from ..utils.security import get_password_hash # Utility for hashing passwords
from ..models import User, UserCreate, UserUpdate, UserRole # User and UserRole for permission checks

router = APIRouter(prefix="/users", tags=["users"])

# Placeholder for database dependency
async def get_db_placeholder():
    pass

# Placeholder for current user dependency (for checking admin rights)
async def get_current_admin_user_placeholder():
    # Mock admin user for permission-requiring operations
    return User(id="mock_admin_id", username="mockadmin", email="admin@example.com", role=UserRole.ADMIN, password_hash="hashed")

# Placeholder for password hashing utility
def get_password_hash_placeholder(password: str):
    return f"hashed_{password}" # In a real app, use a strong hashing algorithm

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_data: UserCreate,
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_admin_user: User = Depends(get_current_admin_user_placeholder) # Only admin can create users
):
    if current_admin_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create users")

    # Check if username or email already exists
    existing_user_by_username = await db.users.find_one({"username": user_data.username})
    if existing_user_by_username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")
    
    existing_user_by_email = await db.users.find_one({"email": user_data.email})
    if existing_user_by_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed_password = get_password_hash_placeholder(user_data.password)
    new_user_data = user_data.dict(exclude={"password"})
    new_user_data["password_hash"] = hashed_password
    
    new_user = User(**new_user_data)
    await db.users.insert_one(new_user.dict())
    return new_user

@router.get("/", response_model=List[User])
async def get_users(
    limit: int = Query(20, ge=1, le=100),
    skip: int = Query(0, ge=0),
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_admin_user: User = Depends(get_current_admin_user_placeholder) # Only admin can list all users
):
    if current_admin_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to list users")

    cursor = db.users.find().skip(skip).limit(limit)
    users = await cursor.to_list(limit)
    return [User(**user) for user in users]

@router.get("/{user_id}", response_model=User)
async def get_user(
    user_id: str, 
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_admin_user: User = Depends(get_current_admin_user_placeholder) # Only admin can get any user by ID
):
    if current_admin_user.role != UserRole.ADMIN:
        # Allow users to get their own info if needed, but this endpoint is admin-focused
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view this user")

    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return User(**user)

@router.put("/{user_id}", response_model=User)
async def update_user(
    user_id: str,
    user_update: UserUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_admin_user: User = Depends(get_current_admin_user_placeholder) # Only admin can update users
):
    if current_admin_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update users")

    update_data = {k: v for k, v in user_update.dict(exclude_unset=True).items() if v is not None}

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update"
        )
    
    if "password" in update_data and update_data["password"]:
        update_data["password_hash"] = get_password_hash_placeholder(update_data.pop("password"))
    
    # Prevent duplicate username/email on update
    if "username" in update_data:
        existing_user = await db.users.find_one({"username": update_data["username"], "id": {"$ne": user_id}})
        if existing_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken")
    if "email" in update_data:
        existing_user = await db.users.find_one({"email": update_data["email"], "id": {"$ne": user_id}})
        if existing_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered by another user")

    result = await db.users.update_one(
        {"id": user_id},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        existing_usr = await db.users.find_one({"id": user_id})
        if not existing_usr:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

    updated_user = await db.users.find_one({"id": user_id})
    if not updated_user:
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found after update attempt")
    return User(**updated_user)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: str, 
    db: AsyncIOMotorDatabase = Depends(get_db_placeholder),
    current_admin_user: User = Depends(get_current_admin_user_placeholder) # Only admin can delete users
):
    if current_admin_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete users")
    
    if user_id == current_admin_user.id: # Prevent admin from deleting themselves
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Admin users cannot delete their own account")

    result = await db.users.delete_one({"id": user_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return None

