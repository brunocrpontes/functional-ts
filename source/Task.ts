import type { Monad } from "./Monad";
import { compose } from "./compose";

type TaskHandle<E, R> = (fail: (error: E) => void, done: (result: R) => void) => void

export interface Task<E, R> extends Monad<R> {
  fork: TaskHandle<E, R>;
  map: <R2>(f: (value: R) => R2) => Task<E, R2>;
  flatMap: <R2>(f: (value: R) => Task<E, R2>) => Task<E, R2>
}

export const Task = <E, R>(fork: TaskHandle<E, R>): Task<E, R> => ({
  fork,
  map: (f) => Task((fail, done) => fork(fail, compose(done, f))),
  flatMap: (f) => Task((fail, done) => fork(fail, (value) => f(value).fork(fail, done)))
})

Task.of = <D>(value: D) => Task<D, never>((done) => done(value));
