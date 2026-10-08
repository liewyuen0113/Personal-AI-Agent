import { Routine } from '../types';
import { mockRoutines } from '../data/mockData';

// TODO: Replace with: return fetch(`${BASE_URL}/routines`)

export function getRoutines(): Promise<Routine[]> {
  return Promise.resolve([...mockRoutines]);
}

export function addRoutine(routine: Omit<Routine, 'id'>): Promise<Routine> {
  // TODO: Replace with: return fetch(`${BASE_URL}/routines`, { method: 'POST', body: JSON.stringify(routine), headers: { 'Content-Type': 'application/json' } })
  const newRoutine: Routine = {
    ...routine,
    id: `r_${Date.now()}`,
  };
  return Promise.resolve(newRoutine);
}

export function dismissSuggestion(): Promise<void> {
  // TODO: Replace with: return fetch(`${BASE_URL}/routines/suggestions/dismiss`, { method: 'POST' })
  return Promise.resolve();
}
