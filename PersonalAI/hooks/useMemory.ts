import { useState, useEffect, useCallback } from 'react';
import { Memory, MemoryCategory } from '../types';
import * as memoryService from '../services/memoryService';

type CategoryFilter = MemoryCategory | 'all';

export function useMemory() {
  const [allMemories, setAllMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await memoryService.getMemories();
      setAllMemories(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load memories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const memories =
    activeCategory === 'all'
      ? allMemories
      : allMemories.filter((m) => m.category === activeCategory);

  const deleteMemory = useCallback(async (id: string) => {
    await memoryService.deleteMemory(id);
    setAllMemories((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const updateMemory = useCallback(async (id: string, text: string) => {
    const updated = await memoryService.updateMemory(id, text);
    setAllMemories((prev) => prev.map((m) => (m.id === id ? updated : m)));
  }, []);

  return {
    memories,
    loading,
    error,
    activeCategory,
    setActiveCategory,
    deleteMemory,
    updateMemory,
    refetch: fetch,
  };
}
