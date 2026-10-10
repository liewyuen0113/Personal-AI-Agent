VALID_ACTION_TYPES = {
    'memory_created',
    'commitment_created',
    'task_created',
    'calendar_event_created',
    'routine_updated',
    'skill_executed',
}


def test_chat_returns_reply(client):
    response = client.post('/chat', json={'message': 'My doctor appointment is November 3. Remind me three days before.', 'user_id': 'demo-user'})
    assert response.status_code == 200
    data = response.json()
    assert 'reply' in data
    assert isinstance(data['reply'], str)
    assert len(data['reply']) > 0


def test_chat_action_type_is_valid(client):
    response = client.post('/chat', json={'message': 'Hello', 'user_id': 'test-user'})
    assert response.status_code == 200
    data = response.json()
    if data.get('action'):
        assert data['action']['type'] in VALID_ACTION_TYPES


def test_chat_requires_message_and_user_id(client):
    response = client.post('/chat', json={'message': 'Hello'})
    assert response.status_code == 422


def test_chat_requires_user_id(client):
    response = client.post('/chat', json={'user_id': 'test-user'})
    assert response.status_code == 422
