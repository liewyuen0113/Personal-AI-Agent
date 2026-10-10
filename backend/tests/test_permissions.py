def test_permissions_returns_list(client):
    response = client.get('/permissions')
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)


def test_permissions_returns_8_items(client):
    response = client.get('/permissions')
    data = response.json()
    assert len(data) == 8


def test_permissions_have_required_fields(client):
    response = client.get('/permissions')
    data = response.json()
    for p in data:
        assert 'id' in p
        assert 'tool' in p
        assert 'action' in p
        assert 'enabled' in p


def test_update_permission_p3_enable(client):
    response = client.put('/permissions/p3', json={'enabled': True})
    assert response.status_code == 200
    data = response.json()
    assert data['enabled'] is True
    assert data['id'] == 'p3'


def test_update_permission_p3_was_disabled(client):
    # Verify seed state: p3 starts disabled
    perms = client.get('/permissions').json()
    p3 = next(p for p in perms if p['id'] == 'p3')
    assert p3['enabled'] is False


def test_update_permission_not_found(client):
    response = client.put('/permissions/nonexistent', json={'enabled': True})
    assert response.status_code == 404
