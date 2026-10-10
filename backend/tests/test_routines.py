def test_routines_returns_list(client):
    response = client.get('/routines')
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)


def test_routines_returns_3_items(client):
    response = client.get('/routines')
    data = response.json()
    assert len(data) == 3


def test_routines_have_required_fields(client):
    response = client.get('/routines')
    data = response.json()
    for r in data:
        assert 'id' in r
        assert 'name' in r
        assert 'frequencyDays' in r
        assert 'lastCompletedAt' in r
        assert 'status' in r
