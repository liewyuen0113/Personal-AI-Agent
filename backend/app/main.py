import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title='Personal AI Backend', version='0.1.0-milestone1')

# CORS configuration
cors_origins_env = os.getenv('CORS_ORIGINS', '')
default_origins = [
    'http://localhost:8081',
    'http://localhost:19006',
    'exp://localhost:8081',
]
if cors_origins_env:
    origins = [o.strip() for o in cors_origins_env.split(',') if o.strip()]
else:
    origins = default_origins

# In development, allow all origins so the Expo dev client can connect from any device
if os.getenv('ENVIRONMENT', 'development') == 'development':
    origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Register routers
from app.api import health, chat, memory, things, routines, skills, permissions  # noqa: E402

app.include_router(health.router)
app.include_router(chat.router)
app.include_router(memory.router)
app.include_router(things.router)
app.include_router(routines.router)
app.include_router(skills.router)
app.include_router(permissions.router)
