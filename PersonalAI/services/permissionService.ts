import { Permission, ConnectedTool } from '../types';
import { mockConnectedTools } from '../data/mockData';
import { BASE_URL } from './api';

export async function getPermissions(): Promise<Permission[]> {
  const res = await fetch(`${BASE_URL}/permissions`);
  if (!res.ok) throw new Error('Failed to fetch permissions');
  return res.json();
}

export async function togglePermission(id: string, enabled: boolean): Promise<Permission> {
  const res = await fetch(`${BASE_URL}/permissions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled }),
  });
  if (!res.ok) throw new Error('Failed to update permission');
  return res.json();
}

// Connected tools not yet in backend — keep mock for now
export async function getConnectedTools(): Promise<ConnectedTool[]> {
  return [...mockConnectedTools];
}
