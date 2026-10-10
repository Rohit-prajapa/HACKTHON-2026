
import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storageKey = `treasury-pulse:${key}`;

  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(storageKey);
      return storedValue !== null
        ? (JSON.parse(storedValue) as T)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error('Unable to persist setting:', error);
    }
  }, [storageKey, value]);

  return [value, setValue] as const;
}
