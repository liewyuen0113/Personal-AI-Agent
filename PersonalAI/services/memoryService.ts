import { Memory } from '../types';
import { mockMemories } from '../data/mockData';

// TODO: Replace with: return fetch(`${BASE_URL}/memory`)

export function getMemories(): Promise<Memory[]> {
  return Promise.resolve([...mockMemories]);
}

export function deleteMemory(id: string): Promise<void> {
  // TODO: Replace with: return fetch(`${BASE_URL}/memory/${id}`, { method: 'DELETE' })
  return Promise.resolve();
}

export function updateMemory(id: string, text: string): Promise<Memory> {
  // TODO: Replace with: return fetch(`${BASE_URL}/memory/${id}`, { method: 'PATCH', body: JSON.stringify({ text }), headers: { 'Content-Type': 'application/json' } })
  const existing = mockMemories.find((m) => m.id === id);
  if (!existing) {
    return Promise.reject(new Error(`Memory not found: ${id}`));
  }
  const updated: Memory = { ...existing, text };
  return Promise.resolve(updated);
}
