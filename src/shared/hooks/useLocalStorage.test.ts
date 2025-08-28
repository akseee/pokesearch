import { renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import { act } from 'react';

describe('UseLocalStorage', () => {
  const STORAGE_KEY = 'test-key';
  const STORAGE_VALUE = 'test-value';

  beforeEach(() => {
    localStorage.clear();
  });

  test('should return empty string if nothinig in LS', () => {
    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY));
    expect(result.current.queryLS).toBe('');
  });

  test('should read from localStorage on mount', () => {
    localStorage.setItem(STORAGE_KEY, STORAGE_VALUE);

    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY));
    expect(result.current.queryLS).toBe(STORAGE_VALUE);
  });

  test('should update localStorage and state', () => {
    localStorage.setItem(STORAGE_KEY, STORAGE_VALUE);

    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY));

    const newValue = STORAGE_VALUE + '1';
    act(() => {
      result.current.setQueryLS(newValue);
    });

    expect(result.current.queryLS).toBe(newValue);
  });
});
