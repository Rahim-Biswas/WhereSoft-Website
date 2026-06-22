from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.contact import ContactSubmission
from app.schemas.contact import ContactCreate, ContactOut
from typing import List
from app.utils.auth import get_current_admin

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("/", response_model=ContactOut, status_code=status.HTTP_201_CREATED)
def submit_contact(data: ContactCreate, db: Session = Depends(get_db)):
    submission = ContactSubmission(**data.model_dump())
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


@router.get("/", response_model=List[ContactOut])
def list_submissions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    return db.query(ContactSubmission).order_by(
        ContactSubmission.created_at.desc()).offset(skip).limit(limit).all()


@router.put("/{submission_id}/read", response_model=ContactOut)
def mark_read(submission_id: int, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    sub = db.query(ContactSubmission).filter(ContactSubmission.id == submission_id).first()
    if sub:
        sub.is_read = True
        db.commit()
        db.refresh(sub)
    return sub
