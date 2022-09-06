import React, { useEffect, useState } from 'react';

export function useDebounce(value, delay = 300) {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay)
    return () => clearTimeout(handler);
  }, [value, delay])
  return debounce;
}