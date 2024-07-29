export type Success<T> = { type: 'ok'; value: T };
export type Err<E> = { type: 'err'; error: E };

export type Result<T, E> =
  | (T extends never ? never : Success<T>)
  | (E extends never ? never : Err<E>);

export function ok<T>(value: T): Result<T, never> {
  return { type: 'ok', value } as Result<T, never>;
}

export function isOk<T, E>(result: Result<T, E>): result is Result<T, never> {
  return result.type === 'ok';
}
export function err<E>(error: E): Result<never, E> {
  return { type: 'err', error } as Result<never, E>;
}
export function isErr<T, E>(result: Result<T, E>): result is Result<never, E> {
  return result.type === 'err';
}
