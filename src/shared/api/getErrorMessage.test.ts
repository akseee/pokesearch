import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMessage } from './getErrorMessage';
import type { SerializedError } from 'vitest';

describe('getErrorMessage', () => {
  describe('getErrorMessage', () => {
    test('returns empty string if error is undefined', () => {
      expect(getErrorMessage(undefined)).toBe('');
    });

    test('handles numeric status 404', () => {
      const error: FetchBaseQueryError = { status: 404, data: [] };
      expect(getErrorMessage(error)).toBe('No Pokémon found.');
    });

    test('handles numeric status 500', () => {
      const error: FetchBaseQueryError = { status: 500, data: [] };
      expect(getErrorMessage(error)).toBe(
        'Server error. Please try again later.'
      );
    });

    test('handles other numeric status', () => {
      const error: FetchBaseQueryError = { status: 403, data: [] };
      expect(getErrorMessage(error)).toBe('Error: 403');
    });

    test('handles status "FETCH_ERROR"', () => {
      const error: FetchBaseQueryError = {
        status: 'FETCH_ERROR',
        error: 'test',
      };
      expect(getErrorMessage(error)).toBe(
        'Network error. Please check your internet connection and try again.'
      );
    });

    test('handles status "PARSING_ERROR"', () => {
      const error: FetchBaseQueryError = {
        status: 'PARSING_ERROR',
        originalStatus: 42,
        data: 'test',
        error: 'test',
      };
      expect(getErrorMessage(error)).toBe(
        'Data parsing error. Please try again later.'
      );
    });

    test('handles status "TIMEOUT_ERROR"', () => {
      const error: FetchBaseQueryError = {
        status: 'TIMEOUT_ERROR',
        error: 'test',
      };
      expect(getErrorMessage(error)).toBe(
        'Request timed out. Please try again later.'
      );
    });

    test('handles SerializedError with message', () => {
      const error: SerializedError = { message: 'Something went wrong' };
      expect(getErrorMessage(error)).toBe('Error: Something went wrong');
    });

    test('handles SerializedError without message', () => {
      const error: SerializedError = { message: 'given error text' };
      expect(getErrorMessage(error)).toBe('Error: given error text');
    });
  });
});
