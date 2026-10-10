import { Routine } from '../types';
import { BASE_URL } from './api';

export async function getRoutines(): Promise<Routine[]> {
  const res = await fetch(`${BASE_URL}/routines`);
  if (!res.ok) throw new Error('Failed to fetch routines');
  return res.json();
}
