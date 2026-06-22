import os
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.user import User
from app.models.career import Job
from app.models.blog import BlogPost
from app.utils.security import get_password_hash
from dotenv import load_dotenv

load_dotenv()

Base.metadata.create_all(bind=engine)


def seed_admin():
    db: Session = SessionLocal()
    try:
        admin_email = os.getenv("FIRST_ADMIN_EMAIL", "admin@wheresoft.in")
        admin_password = os.getenv("FIRST_ADMIN_PASSWORD", "WhereSoft@Admin2024")

        existing = db.query(User).filter(User.email == admin_email).first()
        if not existing:
            admin = User(
                full_name="WhereSoft Admin",
                email=admin_email,
                hashed_password=get_password_hash(admin_password),
                role="super_admin"
            )
            db.add(admin)
            db.commit()
            print(f"✅ Super admin created: {admin_email}")
        else:
            print(f"ℹ️  Admin already exists: {admin_email}")

        # Seed sample jobs
        if db.query(Job).count() == 0:
            sample_jobs = [
                Job(
                    title="GIS Developer",
                    department="Engineering",
                    location="Hyderabad, Telangana",
                    job_type="Full-time",
                    experience="2-4 years",
                    description="We are looking for a skilled GIS Developer to join our engineering team. You will be responsible for designing and developing web-based GIS applications using modern geospatial technologies.",
                    requirements="• Proficiency in Python, JavaScript\n• Experience with QGIS, ArcGIS, or similar\n• Knowledge of PostGIS, GeoServer\n• Familiarity with Leaflet.js or OpenLayers\n• Understanding of spatial data formats (GeoJSON, Shapefile, etc.)",
                    responsibilities="• Develop and maintain web GIS applications\n• Integrate geospatial APIs and services\n• Optimize spatial queries and data pipelines\n• Collaborate with cross-functional teams",
                    is_active=True
                ),
                Job(
                    title="Remote Sensing Analyst",
                    department="Geospatial Analytics",
                    location="Hyderabad, Telangana",
                    job_type="Full-time",
                    experience="1-3 years",
                    description="Join our geospatial analytics team as a Remote Sensing Analyst. You will work with satellite imagery and aerial data to extract meaningful insights for our clients.",
                    requirements="• Bachelor's/Master's in Remote Sensing, Geoinformatics, or related field\n• Experience with ERDAS Imagine, ENVI, or similar software\n• Knowledge of image classification techniques\n• Python or R scripting skills",
                    responsibilities="• Process and analyze satellite and aerial imagery\n• Develop classification models for land use/land cover\n• Generate reports and visualizations\n• Support client delivery projects",
                    is_active=True
                ),
            ]
            db.add_all(sample_jobs)
            db.commit()
            print("✅ Sample jobs seeded")

        # Seed sample blog posts
        if db.query(BlogPost).count() == 0:
            sample_posts = [
                BlogPost(
                    title="The Future of Web GIS: Trends Shaping Geospatial Technology",
                    slug="future-of-web-gis-trends",
                    excerpt="Explore how cloud-native GIS, AI integration, and real-time geospatial analytics are transforming industries across the globe.",
                    content="# The Future of Web GIS\n\nGeospatial technology is evolving at an unprecedented pace...\n\nCloud-native GIS platforms are enabling organizations to process massive datasets without on-premise infrastructure. Real-time streaming of geospatial data is enabling new use cases in urban mobility, disaster response, and precision agriculture.\n\n## Key Trends\n\n1. **Cloud-Native GIS** — Moving beyond desktop to browser-based platforms\n2. **AI & Machine Learning** — Automated feature extraction from imagery\n3. **Digital Twins** — Real-time 3D representations of physical environments\n4. **Edge Computing** — Processing geospatial data closer to the source",
                    author="WhereSoft Team",
                    category="Technology",
                    tags="GIS,Cloud,AI,Remote Sensing",
                    is_published=True
                ),
                BlogPost(
                    title="Understanding Satellite Imagery: A Beginner's Guide",
                    slug="understanding-satellite-imagery-beginners-guide",
                    excerpt="A comprehensive introduction to satellite imagery types, resolutions, and how they power modern geospatial applications.",
                    content="# Understanding Satellite Imagery\n\nSatellite imagery has become one of the most powerful tools for understanding our world...\n\n## Types of Satellite Imagery\n\n- **Optical Imagery** — Captures visible light, similar to photography\n- **SAR (Synthetic Aperture Radar)** — All-weather, day-night imaging\n- **Multispectral** — Multiple bands beyond visible spectrum\n- **Hyperspectral** — Hundreds of narrow spectral bands",
                    author="WhereSoft Team",
                    category="Education",
                    tags="Satellite,Remote Sensing,Imagery,Beginner",
                    is_published=True
                ),
            ]
            db.add_all(sample_posts)
            db.commit()
            print("✅ Sample blog posts seeded")

    finally:
        db.close()


if __name__ == "__main__":
    seed_admin()
    print("🌍 WhereSoft database seeded successfully!")
