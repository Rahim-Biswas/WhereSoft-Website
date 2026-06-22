from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    author: Optional[str] = "WhereSoft Team"
    category: Optional[str] = None
    tags: Optional[str] = None
    cover_image: Optional[str] = None
    is_published: Optional[bool] = False


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    cover_image: Optional[str] = None
    is_published: Optional[bool] = None


class BlogPostOut(BlogPostBase):
    id: int
    views: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
