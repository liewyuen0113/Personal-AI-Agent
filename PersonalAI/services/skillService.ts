import { Skill } from '../types';
import { BASE_URL } from './api';

export async function getSkills(): Promise<Skill[]> {
  const res = await fetch(`${BASE_URL}/skills`);
  if (!res.ok) throw new Error('Failed to fetch skills');
  return res.json();
}
