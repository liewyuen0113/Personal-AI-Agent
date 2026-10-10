def test_skills_returns_list(client):
    response = client.get('/skills')
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)


def test_skills_returns_3_items(client):
    response = client.get('/skills')
    data = response.json()
    assert len(data) == 3


def test_skills_have_required_fields(client):
    response = client.get('/skills')
    data = response.json()
    for s in data:
        assert 'id' in s
        assert 'name' in s
        assert 'description' in s
        assert 'icon' in s
        assert 'tools' in s
        assert isinstance(s['tools'], list)
