import { useState, useEffect, useCallback } from 'react';
import { Commitment, Task } from '../types';
import * as thingsService from '../services/thingsService';

export function useThings() {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [commitmentsData, tasksData] = await Promise.all([
        thingsService.getCommitments(),
        thingsService.getTasks(),
      ]);
      setCommitments(commitmentsData);
      setTasks(tasksData);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load things');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const toggleTask = useCallback(async (id: string) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
    try {
      const updated = await thingsService.toggleTask(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      // Revert on failure
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    }
  }, []);

  return { commitments, tasks, loading, error, toggleTask, refetch: fetch };
}
