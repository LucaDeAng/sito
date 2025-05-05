from fastapi import APIRouter, HTTPException, Body, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import EmailStr
from typing import List

from models import NewsletterSubscriber, NewsletterSubscriberCreate

router = APIRouter(prefix="/newsletter", tags=["newsletter"])

@router.post("/subscribe", response_model=NewsletterSubscriber, status_code=status.HTTP_201_CREATED)
async def subscribe(subscriber_data: NewsletterSubscriberCreate, db: AsyncIOMotorDatabase = None):
    # Check if subscriber already exists
    existing = await db.newsletter_subscribers.find_one({"email": subscriber_data.email})
    if existing:
        # If they exist but were inactive, reactivate them
        if not existing.get("is_active", True):
            await db.newsletter_subscribers.update_one(
                {"email": subscriber_data.email},
                {"$set": {"is_active": True}}
            )
            updated = await db.newsletter_subscribers.find_one({"email": subscriber_data.email})
            return NewsletterSubscriber(**updated)
        
        # Otherwise, just return the existing subscriber
        return NewsletterSubscriber(**existing)
    
    # Create new subscriber
    new_subscriber = NewsletterSubscriber(email=subscriber_data.email)
    await db.newsletter_subscribers.insert_one(new_subscriber.dict())
    return new_subscriber

@router.post("/unsubscribe", status_code=status.HTTP_200_OK)
async def unsubscribe(email: EmailStr = Body(..., embed=True), db: AsyncIOMotorDatabase = None):
    result = await db.newsletter_subscribers.update_one(
        {"email": email},
        {"$set": {"is_active": False}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found in our subscriber list"
        )
    
    return {"message": "Successfully unsubscribed"}

@router.get("/subscribers", response_model=List[NewsletterSubscriber])
async def get_subscribers(active_only: bool = True, db: AsyncIOMotorDatabase = None):
    query = {"is_active": True} if active_only else {}
    subscribers = await db.newsletter_subscribers.find(query).to_list(1000)
    return [NewsletterSubscriber(**sub) for sub in subscribers]