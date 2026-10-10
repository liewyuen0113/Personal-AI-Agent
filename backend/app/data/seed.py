"""
Seed data matching the mobile app's mockData.ts exactly.
Returns fresh copies on each call — do not mutate these directly.
"""
from copy import deepcopy
from app.schemas.models import (
    Memory, MemoryCategory, Commitment, Task, Routine, Skill, Permission
)

_MEMORIES = [
    Memory(id='m1', text='I prefer morning workouts', category=MemoryCategory.about_me, createdAt='2024-10-15T08:00:00.000Z'),
    Memory(id='m2', text='Preparing for the Nebius × NVIDIA hackathon', category=MemoryCategory.projects, createdAt='2024-10-20T09:30:00.000Z'),
    Memory(id='m3', text='Prefers concise explanations', category=MemoryCategory.preferences, createdAt='2024-10-18T11:00:00.000Z'),
    Memory(id='m4', text='Building a Personal AI mobile app with React Native and Expo', category=MemoryCategory.projects, createdAt='2024-10-22T14:00:00.000Z'),
    Memory(id='m5', text='I am a young professional based in Kuala Lumpur', category=MemoryCategory.about_me, createdAt='2024-10-10T07:00:00.000Z'),
]

_COMMITMENTS = [
    Commitment(id='c1', title='Doctor appointment', dueDate='2024-11-03', reminderDate='2024-10-31', status='active'),
    Commitment(id='c2', title='Follow up with John', dueDate='2024-10-24', status='overdue'),
]

_TASKS = [
    Task(id='t1', title='Prepare hackathon demo', dueDate='2024-10-26', completed=False),
    Task(id='t2', title='Buy keyboard', completed=False),
]

_ROUTINES = [
    Routine(id='r1', name='Exercise', frequencyDays=3, lastCompletedAt='2024-10-24T08:00:00.000Z', status='on_track'),
    Routine(id='r2', name='Apartment cleaning', frequencyDays=14, lastCompletedAt='2024-10-13T10:00:00.000Z', status='due_soon'),
    Routine(id='r3', name='Change bedding', frequencyDays=14, lastCompletedAt='2024-10-09T10:00:00.000Z', status='overdue'),
]

_SKILLS = [
    Skill(id='s1', name='Weekly Planning', description='Review your week, set priorities, and schedule key tasks.', icon='📅', tools=['Calendar', 'Tasks', 'Goals']),
    Skill(id='s2', name='Meeting Preparation', description='Summarise context and prepare talking points before meetings.', icon='🎯', tools=['Calendar', 'Files']),
    Skill(id='s3', name='Meeting Summary', description='Capture action items and decisions after a meeting.', icon='📝', tools=['Files', 'Tasks']),
]

_PERMISSIONS = [
    Permission(id='p1', tool='Calendar', action='read events', enabled=True),
    Permission(id='p2', tool='Calendar', action='create events', enabled=True),
    Permission(id='p3', tool='Calendar', action='delete events', enabled=False),
    Permission(id='p4', tool='Tasks', action='create tasks', enabled=True),
    Permission(id='p5', tool='Tasks', action='complete tasks', enabled=True),
    Permission(id='p6', tool='Messages', action='send messages', enabled=False),
    Permission(id='p7', tool='Files', action='read files', enabled=True),
    Permission(id='p8', tool='Files', action='write files', enabled=False),
]


def get_seed_memories():
    return deepcopy(_MEMORIES)

def get_seed_commitments():
    return deepcopy(_COMMITMENTS)

def get_seed_tasks():
    return deepcopy(_TASKS)

def get_seed_routines():
    return deepcopy(_ROUTINES)

def get_seed_skills():
    return deepcopy(_SKILLS)

def get_seed_permissions():
    return deepcopy(_PERMISSIONS)
