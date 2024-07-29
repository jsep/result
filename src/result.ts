export type Success<T> = { type: "ok"; value: T };
export type Err<E> = { type: "err"; error: E };

export type Result<T, E> =
  | (T extends never ? never : Success<T>)
  | (E extends never ? never : Err<E>);
