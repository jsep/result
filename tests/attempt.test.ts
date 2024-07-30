import { describe, it, expect } from 'vitest';
import { attempt, attemptAsync } from '../src/attempt';
import { isErr, isOk } from '../src/result';

describe('attempt', () => {
  it('should return ok result for successful function', () => {
    const result = attempt(() => 42);

    expect(isOk(result)).toBe(true);

    if (isOk(result)) {
      expect(result.value).toBe(42);
    } else {
      throw new Error('Result is not ok');
    }
  });

  it('should return err result for throwing function', () => {
    const error = new Error('Test error');
    const result = attempt(() => {
      throw error;
    });

    expect(isErr(result)).toBe(true);

    if (isErr(result)) {
      expect(result.error).toBe(error);
    } else {
      throw new Error('Result is not err');
    }
  });
});

describe('attemptAsync', () => {
  it('should return ok result for successful async function', async () => {
    const result = await attemptAsync(async () => 42);

    expect(isOk(result)).toBe(true);

    if (isOk(result)) {
      expect(result.value).toBe(42);
    } else {
      throw new Error('Result is not ok');
    }
  });

  it('should return err result for throwing async function', async () => {
    const error = new Error('Test error');
    const result = await attemptAsync(async () => {
      throw error;
    });

    expect(isErr(result)).toBe(true);

    if (isErr(result)) {
      expect(result.error).toBe(error);
    } else {
      throw new Error('Result is not err');
    }
  });
});
