import { Memory } from '../types';
import { BASE_URL } from './api';

export async function getMemories(): Promise<Memory[]> {
  const res = await fetch(`${BASE_URL}/memory`);
  if (!res.ok) throw new Error('Failed to fetch memories');
  return res.json();
}

export async function deleteMemory(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/memory/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete memory');
}

export async function updateMemory(id: string, text: string, category: string): Promise<Memory> {
  const res = await fetch(`${BASE_URL}/memory/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, category }),
  });
  if (!res.ok) throw new Error('Failed to update memory');
  return res.json();
}
