from fastapi import APIRouter

router = APIRouter()


@router.get('/health')
def health_check():
    return {
        'status': 'ok',
        'service': 'Personal AI Backend',
        'version': '0.1.0-milestone1',
        'note': 'In-memory mock only. No database, AI, or scheduler connected.',
    }
