import { Permission, ConnectedTool } from '../types';
import { mockPermissions, mockConnectedTools } from '../data/mockData';

// TODO: Replace with: return fetch(`${BASE_URL}/permissions`)

export function getPermissions(): Promise<Permission[]> {
  return Promise.resolve([...mockPermissions]);
}

export function togglePermission(id: string): Promise<Permission> {
  // TODO: Replace with: return fetch(`${BASE_URL}/permissions/${id}/toggle`, { method: 'PATCH' })
  const permission = mockPermissions.find((p) => p.id === id);
  if (!permission) {
    return Promise.reject(new Error(`Permission not found: ${id}`));
  }
  return Promise.resolve({ ...permission, enabled: !permission.enabled });
}

export function getConnectedTools(): Promise<ConnectedTool[]> {
  // TODO: Replace with: return fetch(`${BASE_URL}/tools`)
  return Promise.resolve([...mockConnectedTools]);
}
