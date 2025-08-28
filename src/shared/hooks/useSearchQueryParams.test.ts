import { renderHook } from '@testing-library/react';
import { useSearchQueryParams } from './useSearchQueryParams';

const mockSetParams = vi.fn();
const mockParams = new URLSearchParams();

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useSearchParams: () => [mockParams, mockSetParams],
  };
});

const mockSetQueryLS = vi.fn();
const mockUseLocalStorage = vi.fn(() => ({
  queryLS: '',
  setQueryLS: mockSetQueryLS,
}));

vi.mock('./useLocalStorage', () => ({
  useLocalStorage: () => mockUseLocalStorage(),
}));

describe('useSearchQueryParams', () => {
  beforeEach(() => {
    mockParams.delete('query');
    mockParams.delete('page');
    mockSetParams.mockClear();
    mockSetQueryLS.mockClear();
  });

  test('return query and page', () => {
    mockParams.set('query', 'pikachu');
    mockParams.set('page', '3');

    const { result } = renderHook(() => useSearchQueryParams());

    expect(result.current.query).toBe('pikachu');
    expect(result.current.page).toBe(3);
  });

  test('sets query from localstorage if query is empty', () => {
    mockUseLocalStorage.mockReturnValueOnce({
      queryLS: 'test',
      setQueryLS: mockSetQueryLS,
    });

    renderHook(() => useSearchQueryParams());

    expect(mockSetParams).toHaveBeenCalled();

    const call = mockSetParams.mock.calls[0][0](new URLSearchParams());

    expect(call.get('query')).toBe('test');
    expect(call.get('page')).toBe('1');
  });
});
