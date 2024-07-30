import { describe, it, expect } from 'vitest';
import { ok, err, isOk, isErr } from '../src/result';

describe('Result', () => {
  it('should return an ok result', () => {
    expect(ok(42)).toEqual({ type: 'ok', value: 42 });
  });

  it('should return an err result', () => {
    expect(err('error')).toEqual({ type: 'err', error: 'error' });
  });

  it('should verify if a result is ok', () => {
    expect(isOk(ok(42))).toBe(true);
    expect(isOk(err('error'))).toBe(false);
  });

  it('should get the value of an ok result', () => {
    const result = ok(42);
    expect(result.value).toBe(42);
  });

  it('should verify if a result is err', () => {
    expect(isErr(ok(42))).toBe(false);
    expect(isErr(err('error'))).toBe(true);
  });

  it('should get the error of an err result', () => {
    const result = err('error');
    expect(result.error).toBe('error');
  });
});
