from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.career import Job
from app.models.blog import BlogPost
from app.models.contact import ContactSubmission
from app.utils.auth import get_current_admin

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/stats")
def get_stats(db: Session = Depends(get_db), _=Depends(get_current_admin)):
    total_users = db.query(User).count()
    active_jobs = db.query(Job).filter(Job.is_active == True).count()
    total_jobs = db.query(Job).count()
    published_posts = db.query(BlogPost).filter(BlogPost.is_published == True).count()
    total_posts = db.query(BlogPost).count()
    unread_messages = db.query(ContactSubmission).filter(ContactSubmission.is_read == False).count()
    total_messages = db.query(ContactSubmission).count()

    return {
        "users": {"total": total_users},
        "jobs": {"active": active_jobs, "total": total_jobs},
        "posts": {"published": published_posts, "total": total_posts},
        "messages": {"unread": unread_messages, "total": total_messages}
    }
