from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
import uuid
from datetime import datetime

# Base models for database
class DBModelBase(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Newsletter subscriber models
class NewsletterSubscriber(DBModelBase):
    email: EmailStr
    is_active: bool = True
    tags: List[str] = []

class NewsletterSubscriberCreate(BaseModel):
    email: EmailStr

# Contact form models
class ContactSubmission(DBModelBase):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    status: str = "new"  # new, read, responded, archived

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

# Prompt models
class Prompt(DBModelBase):
    title: str
    description: str
    prompt_text: str
    category: str
    tags: List[str] = []
    likes: int = 0
    views: int = 0

class PromptCreate(BaseModel):
    title: str
    description: str
    prompt_text: str
    category: str
    tags: List[str] = []

class PromptUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    prompt_text: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None