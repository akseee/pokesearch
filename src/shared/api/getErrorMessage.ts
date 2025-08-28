import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string {
  if (!error) return '';

  if ('status' in error) {
    const base: FetchBaseQueryError = error;
    if (typeof base.status === 'number') {
      if (base.status === 404) return 'No Pokémon found.';
      if (base.status === 500) return 'Server error. Please try again later.';
      return `Error: ${base.status}`;
    }

    if (base.status === 'FETCH_ERROR') {
      return 'Network error. Please check your internet connection and try again.';
    }

    if (base.status === 'PARSING_ERROR') {
      return 'Data parsing error. Please try again later.';
    }

    if (base.status === 'TIMEOUT_ERROR') {
      return 'Request timed out. Please try again later.';
    }

    return 'An unknown request error occurred.';
  }

  const serialized: SerializedError = error;
  if (serialized.message) {
    return `Error: ${serialized.message}`;
  }

  return 'An unknown error occurred.';
}
