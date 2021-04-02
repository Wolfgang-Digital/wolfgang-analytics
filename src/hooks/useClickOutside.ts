import { useRef, useEffect } from 'react';

export const useClickOutside = (callback: (e: MouseEvent) => void, isListening: boolean) => {
  const ref = useRef<any>();

  useEffect(() => {
    if (isListening) {
      document.addEventListener('mousedown', callback);
    } else {
      document.removeEventListener('mousedown', callback);
    }
    return () => {
      document.removeEventListener('mousedown', callback);
    };
  }, [callback, isListening]);

  return ref;
  ;
}