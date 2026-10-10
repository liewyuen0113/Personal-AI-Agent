def test_things_returns_commitments_and_tasks(client):
    response = client.get('/things')
    assert response.status_code == 200
    data = response.json()
    assert 'commitments' in data
    assert 'tasks' in data
    assert isinstance(data['commitments'], list)
    assert isinstance(data['tasks'], list)


def test_things_commitments_have_required_fields(client):
    response = client.get('/things')
    data = response.json()
    for c in data['commitments']:
        assert 'id' in c
        assert 'title' in c
        assert 'dueDate' in c
        assert 'status' in c


def test_things_tasks_have_required_fields(client):
    response = client.get('/things')
    data = response.json()
    for t in data['tasks']:
        assert 'id' in t
        assert 'title' in t
        assert 'completed' in t
