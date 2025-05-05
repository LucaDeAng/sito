from fastapi import FastAPI, APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import models
from models import (
    StatusCheck, StatusCheckCreate, 
    NewsletterSubscriber, NewsletterSubscriberCreate, 
    ContactSubmission, ContactSubmissionCreate
)

# Import route modules
from routes import newsletter, contact, prompts

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Dependency to get the database
async def get_db() -> AsyncIOMotorDatabase:
    return db

# Create the main app without a prefix
app = FastAPI(
    title="GenAI Portfolio API",
    description="API for Luca De Angelis GenAI Portfolio and Blog",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Legacy status check routes
@api_router.get("/")
async def root():
    return {"message": "Hello from Luca De Angelis GenAI API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(db: AsyncIOMotorDatabase = Depends(get_db)):
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Add the route dependencies for DB
async def inject_db_dependency(route):
    if hasattr(route, "endpoint"):
        if "db" in route.endpoint.__annotations__:
            # Add our dependency
            if not hasattr(route, "dependencies"):
                route.dependencies = []
            route.dependencies.append(Depends(get_db))
    
    # Process child routes if any
    if hasattr(route, "routes"):
        for child_route in route.routes:
            await inject_db_dependency(child_route)

# Include the router modules with their prefixes
api_router.include_router(newsletter.router)
api_router.include_router(contact.router)
api_router.include_router(prompts.router)

# Include the main router in the app
app.include_router(api_router)

# Add DB dependency to all routes
@app.on_event("startup")
async def startup_db_client():
    # Add DB dependency to all routes that need it
    for route in app.routes:
        await inject_db_dependency(route)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
