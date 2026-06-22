from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    department = Column(String(150), nullable=False)
    location = Column(String(255), default="Hyderabad, Telangana")
    job_type = Column(String(50), default="Full-time")  # Full-time, Part-time, Contract, Internship
    experience = Column(String(100), nullable=True)
    salary_range = Column(String(100), nullable=True)
    description = Column(Text, nullable=False)
    requirements = Column(Text, nullable=False)
    responsibilities = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
