import { useEffect, useState } from 'react';

export const useToastClosing = (onClose: () => void) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const startCloseTimeoutId = setTimeout(() => {
      setIsClosing(true);
    }, 2700);
    const closeTimeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(startCloseTimeoutId);
      clearTimeout(closeTimeoutId);
      setIsClosing(false);
    };
  }, [onClose]);
  return { isClosing };
};
