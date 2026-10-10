
const STORAGE_PREFIX = 'treasury-pulse:';

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${key}`,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error('Unable to save data to local storage:', error);
  }
}

export function loadFromStorage<T>(
  key: string,
  fallback: T
): T {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);

    if (stored === null) return fallback;

    return JSON.parse(stored) as T;
  } catch (error) {
    console.error('Unable to load data from local storage:', error);
    return fallback;
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.error('Unable to remove stored data:', error);
  }
}
