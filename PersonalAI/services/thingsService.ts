import { Commitment, Task } from '../types';
import { mockCommitments, mockTasks } from '../data/mockData';

// TODO: Replace with: return fetch(`${BASE_URL}/things/commitments`)

export function getCommitments(): Promise<Commitment[]> {
  return Promise.resolve([...mockCommitments]);
}

export function getTasks(): Promise<Task[]> {
  // TODO: Replace with: return fetch(`${BASE_URL}/things/tasks`)
  return Promise.resolve([...mockTasks]);
}

export function toggleTask(id: string): Promise<Task> {
  // TODO: Replace with: return fetch(`${BASE_URL}/things/tasks/${id}/toggle`, { method: 'PATCH' })
  const task = mockTasks.find((t) => t.id === id);
  if (!task) {
    return Promise.reject(new Error(`Task not found: ${id}`));
  }
  return Promise.resolve({ ...task, completed: !task.completed });
}
