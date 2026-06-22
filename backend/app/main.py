import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.database import engine, Base
from app.models import User, Job, BlogPost, ContactSubmission  # noqa: F401 - ensures tables are registered
from app.routers import auth, careers, blog, contact, admin
from app.seed import seed_admin

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="WhereSoft Technologies API",
    description="Backend API for WhereSoft Technologies Private Limited website",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(careers.router)
app.include_router(blog.router)
app.include_router(contact.router)
app.include_router(admin.router)


@app.on_event("startup")
async def startup_event():
    seed_admin()


@app.get("/")
def root():
    return {
        "message": "WhereSoft Technologies API",
        "version": "1.0.0",
        "docs": "/api/docs"
    }


@app.get("/health")
def health():
    return {"status": "healthy", "service": "WhereSoft API"}
