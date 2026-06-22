from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class ContactCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    organization: Optional[str] = None
    subject: str
    message: str


class ContactOut(ContactCreate):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
