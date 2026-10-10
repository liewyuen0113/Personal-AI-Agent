def test_list_memories_returns_5(client):
    response = client.get('/memory')
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 5


def test_list_memories_have_required_fields(client):
    response = client.get('/memory')
    data = response.json()
    for item in data:
        assert 'id' in item
        assert 'text' in item
        assert 'category' in item
        assert 'createdAt' in item


def test_update_memory_m1(client):
    response = client.put('/memory/m1', json={'text': 'Updated text', 'category': 'preferences'})
    assert response.status_code == 200
    data = response.json()
    assert data['text'] == 'Updated text'
    assert data['category'] == 'preferences'
    assert data['id'] == 'm1'


def test_update_memory_text_only(client):
    response = client.put('/memory/m1', json={'text': 'Only text updated'})
    assert response.status_code == 200
    data = response.json()
    assert data['text'] == 'Only text updated'
    # category should remain the original
    assert data['category'] == 'about_me'


def test_update_memory_not_found(client):
    response = client.put('/memory/nonexistent', json={'text': 'x'})
    assert response.status_code == 404


def test_delete_memory_m1(client):
    response = client.delete('/memory/m1')
    assert response.status_code == 204


def test_delete_memory_removes_it(client):
    client.delete('/memory/m1')
    response = client.get('/memory')
    ids = [m['id'] for m in response.json()]
    assert 'm1' not in ids


def test_delete_memory_not_found(client):
    response = client.delete('/memory/nonexistent')
    assert response.status_code == 404
