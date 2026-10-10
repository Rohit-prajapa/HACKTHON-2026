
import { useEffect, useState } from 'react';

export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((previous: T) => T)) => void] {
  const storageKey = `treasury-pulse:${key}`;

  const [state, setState] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved === null ? initialValue : (JSON.parse(saved) as T);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('Unable to persist state:', error);
    }
  }, [storageKey, state]);

  return [state, setState];
}
