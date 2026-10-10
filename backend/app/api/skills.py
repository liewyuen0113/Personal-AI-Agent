from typing import List
from fastapi import APIRouter
from app.schemas.models import Skill
from app.services import mock_store

router = APIRouter()


@router.get('/skills', response_model=List[Skill])
def list_skills():
    return mock_store.get_skills()
