import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = (STORAGE_KEY: string) => {
  const [queryLS, setQueryLSState] = useState('');

  useEffect(() => {
    const storedQuery = localStorage.getItem(STORAGE_KEY);
    if (storedQuery) {
      setQueryLSState(storedQuery);
    }
  }, []);

  const setQueryLS = useCallback((value: string) => {
    localStorage.setItem(STORAGE_KEY, value);
    setQueryLSState(value);
  }, []);

  return { queryLS, setQueryLS };
};
