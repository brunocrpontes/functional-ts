import type { Monad } from "./Monad";
import { compose } from "./compose";

type TaskHandle<D, E> = (done: (value: D) => void, fail: (reason: E) => void) => void

// @ts-ignore
export interface Task<D, E> extends Monad<D> {
  fork: TaskHandle<D, E>;
  map: <R>(f: (value: D) => R) => Task<R, E>;
  flatMap: <R>(f: (value: D) => Task<R, E>) => Task<R, E>
}

export const Task = <D, E>(fork: TaskHandle<D, E>): Task<D, E> => ({
  fork,
  map: (f) => Task((done, fail) => fork(compose(done, f), fail)),
  flatMap: (f) => Task((done, fail) => fork((value) => f(value).fork(done, fail), fail))
})
