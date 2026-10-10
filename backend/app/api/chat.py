from fastapi import APIRouter
from app.schemas.models import ChatRequest, ChatResponse, AgentAction, AgentActionType

router = APIRouter()


@router.post('/chat', response_model=ChatResponse)
def chat(req: ChatRequest):
    """
    Milestone 1 stub. Accepts a message and returns a demo response.
    No AI, database, or scheduler is connected yet.
    """
    return ChatResponse(
        reply='I received your message. This is a demo stub — no AI, database, or scheduler is connected yet.',
        action=AgentAction(
            type=AgentActionType.commitment_created,
            title='Demo response',
            subtitle='Milestone 1 stub only',
            meta='Real Nemotron + commitment logic comes in Milestone 2',
        ),
    )
