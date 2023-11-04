import type { Functor } from "./Functor"

export interface Monad<T> extends Functor<T> {
  map: <R>(f: (value: T) => R) => Monad<R>,
  flatMap: <R>(f: (value: T) => Monad<R>) => Monad<R>
}
