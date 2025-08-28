import { useSearchParams } from 'react-router';
import { STORAGE_KEYS } from '../lib/constants';
import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useSearchQueryParams() {
  const [params, setParams] = useSearchParams();
  const { queryLS, setQueryLS } = useLocalStorage(STORAGE_KEYS.POKEMON_QUERY);

  const query = params.get('query') ?? '';
  const page = Number(params.get('page')) || 1;

  useEffect(() => {
    if (!query && queryLS) {
      setParams((prev) => {
        prev.set('query', queryLS);
        prev.set('page', '1');
        return prev;
      });
    }
  }, [query, queryLS, setParams]);

  const setQuery = (newQuery: string) => {
    setQueryLS(newQuery);
    setParams((prev) => {
      prev.set('query', newQuery);
      return prev;
    });
  };

  const setPage = (newPage: number) => {
    setParams((prev) => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };

  const clearAll = () => {
    setQueryLS('');
    setParams(new URLSearchParams());
  };

  return { query, page, setQuery, setPage, clearAll };
}
