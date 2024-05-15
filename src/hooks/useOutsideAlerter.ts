import { useEffect } from 'react';

export function useOutsideAlerter<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClickOutside: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (onClickOutside) {
          onClickOutside();
        }
      }
    }

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
}
