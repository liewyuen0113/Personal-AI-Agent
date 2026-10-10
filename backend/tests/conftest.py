import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services import mock_store


@pytest.fixture(autouse=True)
def reset_store():
    mock_store.reset_store()
    yield
    mock_store.reset_store()


@pytest.fixture
def client():
    return TestClient(app)
