import { useState, useRef } from 'react';

export function useToast() {
  const [toast, setToast] = useState('');
  const timerRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(''), 2200);
  };

  return { toast, showToast };
}
