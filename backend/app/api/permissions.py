from typing import List
from fastapi import APIRouter, HTTPException
from app.schemas.models import Permission, UpdatePermissionRequest
from app.services import mock_store

router = APIRouter()


@router.get('/permissions', response_model=List[Permission])
def list_permissions():
    return mock_store.get_permissions()


@router.put('/permissions/{id}', response_model=Permission)
def update_permission(id: str, body: UpdatePermissionRequest):
    result = mock_store.update_permission(id, body.enabled)
    if result is None:
        raise HTTPException(status_code=404, detail=f'Permission with id={id!r} not found.')
    return result
