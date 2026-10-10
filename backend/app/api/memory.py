from typing import List
from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from app.schemas.models import Memory, UpdateMemoryRequest
from app.services import mock_store

router = APIRouter()


@router.get('/memory', response_model=List[Memory])
def list_memories():
    return mock_store.get_memories()


@router.put('/memory/{id}', response_model=Memory)
def update_memory(id: str, body: UpdateMemoryRequest):
    result = mock_store.update_memory(id, body.text, body.category)
    if result is None:
        raise HTTPException(status_code=404, detail=f'Memory with id={id!r} not found.')
    return result


@router.delete('/memory/{id}')
def delete_memory(id: str):
    deleted = mock_store.delete_memory(id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f'Memory with id={id!r} not found.')
    return Response(status_code=204)
