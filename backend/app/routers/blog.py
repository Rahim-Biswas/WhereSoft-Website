from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.blog import BlogPost
from app.schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostOut
from app.utils.auth import get_current_admin

router = APIRouter(prefix="/api/blog", tags=["Blog"])


@router.get("/", response_model=List[BlogPostOut])
def list_posts(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return db.query(BlogPost).filter(BlogPost.is_published == True).order_by(
        BlogPost.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/all", response_model=List[BlogPostOut])
def list_all_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    return db.query(BlogPost).order_by(BlogPost.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{slug}", response_model=BlogPostOut)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug, BlogPost.is_published == True).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    post.views += 1
    db.commit()
    db.refresh(post)
    return post


@router.post("/", response_model=BlogPostOut, status_code=status.HTTP_201_CREATED)
def create_post(post_data: BlogPostCreate, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    existing = db.query(BlogPost).filter(BlogPost.slug == post_data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    post = BlogPost(**post_data.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/{post_id}", response_model=BlogPostOut)
def update_post(post_id: int, post_data: BlogPostUpdate, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    for key, value in post_data.model_dump(exclude_unset=True).items():
        setattr(post, key, value)
    db.commit()
    db.refresh(post)
    return post


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(post)
    db.commit()
