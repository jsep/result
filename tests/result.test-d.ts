import { expectType } from 'tsd';
import { Result, err, ok } from '../src/result';

const okResult = ok(42);
const errResult = err('error');

expectType<Result<number, never>>(okResult);
expectType<Result<never, string>>(errResult);

expectType<number>(okResult.value);
expectType<string>(errResult.error);
