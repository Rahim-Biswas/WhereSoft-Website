"""
WhereSoft Technologies — Backend Server Runner
Run this file to start the FastAPI development server.
Usage: python run.py
"""

import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    reload = os.getenv("RELOAD", "true").lower() == "true"

    print("=" * 55)
    print("  WhereSoft Technologies — API Server")
    print("=" * 55)
    print(f"  ► URL   : http://localhost:{port}")
    print(f"  ► Docs  : http://localhost:{port}/api/docs")
    print(f"  ► ReDoc : http://localhost:{port}/api/redoc")
    print(f"  ► Reload: {reload}")
    print("=" * 55)

    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=reload,
        log_level="info",
    )
