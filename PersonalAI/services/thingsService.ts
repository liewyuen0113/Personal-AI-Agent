import { Commitment, Task } from '../types';
import { BASE_URL } from './api';

export async function getThings(): Promise<{ commitments: Commitment[]; tasks: Task[] }> {
  const res = await fetch(`${BASE_URL}/things`);
  if (!res.ok) throw new Error('Failed to fetch things');
  return res.json();
}

export async function getCommitments(): Promise<Commitment[]> {
  const { commitments } = await getThings();
  return commitments;
}

export async function getTasks(): Promise<Task[]> {
  const { tasks } = await getThings();
  return tasks;
}
