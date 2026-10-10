
import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(
  onClickOutside: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const element = ref.current;

      if (
        element &&
        event.target instanceof Node &&
        !element.contains(event.target)
      ) {
        onClickOutside();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [onClickOutside]);

  return ref;
}
