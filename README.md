# Result

A lightweight TypeScript library for handling errors as values.

## Motivation

Handling errors in JavaScript/TypeScript can be inconsistent and unclear. Functions may throw exceptions, return null, undefined, or an error object. This inconsistency makes code harder to read and maintain.

Consider this example:

```typescript
type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

async function getTodoById(id: string): Promise<Todo> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
  ); // Can throw an exception
  const json = await response.json(); // Can throw an exception
  return json as Todo; // What if the JSON is not a valid Todo?
}
```

This function can fail in multiple places, and handling these errors with try/catch blocks can make the code verbose and harder to read.
Additionally, the function signature doesn’t indicate that it can fail.

This package provides a set of functions and types to handle errors as values in TypeScript, promoting more explicit error handling and better type safety.

## Installation

```bash
npm install @jsep/result
```

## Basic Example

```typescript
import { Result, ok, err, isOk, isErr } from '@jsep/result';
// Example usage
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return err('Division by zero');
  }
  return ok(a / b);
}

const result = divide(10, 2);

if (isOk(result)) {
  console.log('Result:', result.value);
} else {
  console.error('Error:', result.error);
}
```

## Async Functions

```typescript
import { Result, ok, err, isOk, isErr } from '@jsep/result';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

class FetchError extends Error {}
class ParseError extends Error {}

async function getTodoById(
  id: string,
): Promise<Result<Todo, FetchError | ParseError>> {
  const response = await attemptAsync(() =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),
  );
  if (isErr(response)) return err(new FetchError('Failed to fetch todo'));

  const json = await attemptAsync(() => response.value.json());
  if (isErr(json)) return err(new ParseError('Failed to parse todo'));

  return ok(json.value as Todo);
}

const todo = await getTodoById('1');

if (isErr(todo)) {
  console.error('Error:', todo.error);
} else {
  console.log('Todo:', todo.value);
}
```

## Alternatives

- [Effect](https://effect.website/)
- [fp-ts](https://gcanti.github.io/fp-ts/)
- [purify-ts](https://gigobyte.github.io/purify/)

## API

### Types

#### `Success<T>`

Represents a successful result with a value of type `T`.

#### `Err<E>`

Represents an error result with an error of type `E`.

#### `Result<T, E>`

A union type representing either a successful result (`Success<T>`) or an error result (`Err<E>`).

### Functions

#### `ok<T>(value: T): Result<T, never>`

Creates a successful result with the given value.

#### `err<E>(error: E): Result<never, E>`

Creates an error result with the given error.

#### `isOk<T, E>(result: Result<T, E>): result is Result<T, never>`

Type guard to check if a result is successful.

#### `isErr<T, E>(result: Result<T, E>): result is Result<never, E>`

Type guard to check if a result is an error.

#### `attemptAsync<T>(fn: () => Promise<T>): Promise<Result<T, unknown>>`

Wraps an asynchronous function and returns a Result type, catching any errors that occur during execution.

## License

[MIT](LICENSE)
