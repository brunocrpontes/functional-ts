import { Monad } from "./Monad";

export interface IO<T> extends Monad<T> {
  map: <R>(f: (value: T) => R) => IO<R>
  flatMap: <R>(f: (value: T) => Monad<R>) => Monad<R>
}

export function IO<T>(value: T): IO<T> {
  return {
    map: <R>(f: (value: T) => R) => IO(f(value)),
    flatMap: <R>(f: (value: T) => Monad<R>) => f(value)
  }
}

