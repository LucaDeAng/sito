from fastapi import APIRouter, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List

from models import ContactSubmission, ContactSubmissionCreate

router = APIRouter(prefix="/contact", tags=["contact"])

@router.post("/submit", response_model=ContactSubmission, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(submission_data: ContactSubmissionCreate, db: AsyncIOMotorDatabase = None):
    # Create new contact submission
    new_submission = ContactSubmission(**submission_data.dict())
    await db.contact_submissions.insert_one(new_submission.dict())
    return new_submission

@router.get("/submissions", response_model=List[ContactSubmission])
async def get_submissions(status: str = None, db: AsyncIOMotorDatabase = None):
    # Build query based on status filter
    query = {}
    if status:
        query["status"] = status
        
    submissions = await db.contact_submissions.find(query).sort("created_at", -1).to_list(1000)
    return [ContactSubmission(**sub) for sub in submissions]

@router.put("/submissions/{submission_id}/status", response_model=ContactSubmission)
async def update_submission_status(
    submission_id: str, 
    status: str, 
    db: AsyncIOMotorDatabase = None
):
    # Validate status
    valid_statuses = ["new", "read", "responded", "archived"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Status must be one of: {', '.join(valid_statuses)}"
        )
    
    result = await db.contact_submissions.update_one(
        {"id": submission_id},
        {"$set": {"status": status}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Submission not found"
        )
    
    updated = await db.contact_submissions.find_one({"id": submission_id})
    return ContactSubmission(**updated)