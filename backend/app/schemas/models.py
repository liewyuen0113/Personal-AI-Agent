from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class MemoryCategory(str, Enum):
    about_me = 'about_me'
    preferences = 'preferences'
    projects = 'projects'
    people = 'people'


class Memory(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: str
    text: str
    category: MemoryCategory
    createdAt: str


class Commitment(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: str
    title: str
    dueDate: str
    reminderDate: Optional[str] = None
    status: str  # 'active' | 'overdue' | 'completed'


class Task(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: str
    title: str
    dueDate: Optional[str] = None
    completed: bool


class Routine(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: str
    name: str
    frequencyDays: int
    lastCompletedAt: str
    status: str  # 'on_track' | 'due_soon' | 'overdue'


class Skill(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: str
    name: str
    description: str
    icon: str
    tools: List[str]


class Permission(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: str
    tool: str
    action: str
    enabled: bool


class AgentActionType(str, Enum):
    memory_created = 'memory_created'
    commitment_created = 'commitment_created'
    task_created = 'task_created'
    calendar_event_created = 'calendar_event_created'
    routine_updated = 'routine_updated'
    skill_executed = 'skill_executed'


class AgentAction(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    type: AgentActionType
    title: str
    subtitle: Optional[str] = None
    meta: Optional[str] = None
    linkText: Optional[str] = None


class ToolExecutionStep(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    label: str
    completed: bool


class ToolExecution(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    title: str
    steps: List[ToolExecutionStep]


class ChatRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    message: str
    user_id: str


class ChatResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    reply: str
    action: Optional[AgentAction] = None
    toolExecution: Optional[ToolExecution] = None


class ThingsResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    commitments: List[Commitment]
    tasks: List[Task]


class UpdateMemoryRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    text: str
    category: Optional[MemoryCategory] = None


class UpdatePermissionRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    enabled: bool
