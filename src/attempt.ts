import { Result, ok, err } from './result';

export function attempt<T, E = unknown>(fn: () => T): Result<T, E> {
  try {
    return ok(fn());
  } catch (e) {
    return err(e as E);
  }
}

export function attemptAsync<T, E = unknown>(
  fn: () => Promise<T>,
): Promise<Result<T, E>> {
  return fn()
    .then((value) => ok(value))
    .catch((error) => err(error as E));
}
