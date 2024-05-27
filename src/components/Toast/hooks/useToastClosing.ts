import { useEffect } from 'react';

export const useToastClosing = (onClose: () => void) => {
  useEffect(() => {
    const closeTimeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(closeTimeoutId);
    };
  }, [onClose]);
};
