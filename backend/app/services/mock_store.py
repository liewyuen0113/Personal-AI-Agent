"""
In-memory mock store. All data lives in module-level dicts keyed by id.
Call reset_store() to reinitialise from seed (used by tests).
"""
from typing import Dict, Optional
from app.schemas.models import Memory, MemoryCategory, Commitment, Task, Routine, Skill, Permission
from app.data.seed import (
    get_seed_memories, get_seed_commitments, get_seed_tasks,
    get_seed_routines, get_seed_skills, get_seed_permissions,
)

# Module-level stores (mutable)
_memories: Dict[str, Memory] = {}
_commitments: Dict[str, Commitment] = {}
_tasks: Dict[str, Task] = {}
_routines: Dict[str, Routine] = {}
_skills: Dict[str, Skill] = {}
_permissions: Dict[str, Permission] = {}


def reset_store() -> None:
    """Reinitialise all stores from seed data. Called on module load and by tests."""
    global _memories, _commitments, _tasks, _routines, _skills, _permissions
    _memories = {m.id: m for m in get_seed_memories()}
    _commitments = {c.id: c for c in get_seed_commitments()}
    _tasks = {t.id: t for t in get_seed_tasks()}
    _routines = {r.id: r for r in get_seed_routines()}
    _skills = {s.id: s for s in get_seed_skills()}
    _permissions = {p.id: p for p in get_seed_permissions()}


# Initialise on import
reset_store()


# --- Memory ---

def get_memories():
    return list(_memories.values())


def update_memory(id: str, text: str, category: Optional[MemoryCategory]) -> Optional[Memory]:
    if id not in _memories:
        return None
    existing = _memories[id]
    updated = Memory(
        id=existing.id,
        text=text,
        category=category if category is not None else existing.category,
        createdAt=existing.createdAt,
    )
    _memories[id] = updated
    return updated


def delete_memory(id: str) -> bool:
    if id not in _memories:
        return False
    del _memories[id]
    return True


# --- Commitments & Tasks ---

def get_commitments():
    return list(_commitments.values())


def get_tasks():
    return list(_tasks.values())


# --- Routines ---

def get_routines():
    return list(_routines.values())


# --- Skills ---

def get_skills():
    return list(_skills.values())


# --- Permissions ---

def get_permissions():
    return list(_permissions.values())


def update_permission(id: str, enabled: bool) -> Optional[Permission]:
    if id not in _permissions:
        return None
    existing = _permissions[id]
    updated = Permission(
        id=existing.id,
        tool=existing.tool,
        action=existing.action,
        enabled=enabled,
    )
    _permissions[id] = updated
    return updated
