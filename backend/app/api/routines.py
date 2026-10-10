from typing import List
from fastapi import APIRouter
from app.schemas.models import Routine
from app.services import mock_store

router = APIRouter()


@router.get('/routines', response_model=List[Routine])
def list_routines():
    return mock_store.get_routines()
