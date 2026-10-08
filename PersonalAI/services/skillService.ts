import { Skill } from '../types';
import { mockSkills } from '../data/mockData';

// TODO: Replace with: return fetch(`${BASE_URL}/skills`)

export function getSkills(): Promise<Skill[]> {
  return Promise.resolve([...mockSkills]);
}
