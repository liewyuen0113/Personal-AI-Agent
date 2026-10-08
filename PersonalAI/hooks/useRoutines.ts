import { useState, useEffect, useCallback } from 'react';
import { Routine } from '../types';
import * as routineService from '../services/routineService';

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await routineService.getRoutines();
      setRoutines(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load routines');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const dismissSuggestion = useCallback(async () => {
    setShowSuggestion(false);
    await routineService.dismissSuggestion();
  }, []);

  const addRoutine = useCallback(async (routine: Omit<Routine, 'id'>) => {
    const newRoutine = await routineService.addRoutine(routine);
    setRoutines((prev) => [...prev, newRoutine]);
    setShowSuggestion(false);
  }, []);

  return {
    routines,
    loading,
    error,
    showSuggestion,
    dismissSuggestion,
    addRoutine,
    refetch: fetch,
  };
}
