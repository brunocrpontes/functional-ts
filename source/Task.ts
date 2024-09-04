import type { Monad } from "./Monad";
import { compose } from "./compose";

export type TaskResultOf<T> = T extends Task<any, infer R> ? R : T;
export type TaskErrorOf<T> = T extends Task<infer E, any> ? E : T;

export type Task<E, R> = Omit<Monad<R, "Task">, "flatMap" | "map"> & { 
  fork: (fail: (error: E) => void, done: (result: R) => void) => void;
  map: <R2>(func: (value: R) => R2) => Task<E, R2>
  flatMap: <E2, R2>(func: (value: R) => Task<E | E2, R2>) => Task<E | E2, R2>;
};

export const Task = <E, R>(
  fork: (fail: (error: E) => void, done: (result: R) => void) => void,
): Task<E, R> => ({
  _tag_: "Task",
  fork,
  map: (f) => Task<E, ReturnType<typeof f>>((fail, done) => fork(fail, compose(done, f))),
  flatMap: <E2, R2>(f: (value: R) => Task<E | E2, R2>) => 
    Task<E | E2, R2>((fail, done) => fork(
      fail,
      (value) => f(value).fork(fail, done)
      )
    )
});

Task.of = <D>(value: D) => Task<never, D>((_, done) => done(value));
