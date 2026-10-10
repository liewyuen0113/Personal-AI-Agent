from fastapi import APIRouter
from app.schemas.models import ThingsResponse
from app.services import mock_store

router = APIRouter()


@router.get('/things', response_model=ThingsResponse)
def get_things():
    return ThingsResponse(
        commitments=mock_store.get_commitments(),
        tasks=mock_store.get_tasks(),
    )
