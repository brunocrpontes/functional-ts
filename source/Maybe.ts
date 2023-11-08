import { Monad } from './Monad'

export interface Just<T> extends Monad<T> {
  map: <R>(func: (value: T) => R) => Just<R>,
  flatMap: <R>(func: (value: T) => Monad<R>) => Monad<R>,
}
export type Nothing = Monad<never>

export type Maybe<T> = Nothing | Just<T>

export const Nothing: Nothing = {
  map: (_) => Nothing,
  flatMap: (_) => Nothing,
}

export function Just<A>(value: A): Just<A> {
  return {
    map: <B>(func: (value: A) => B) => Just(func(value)),
    flatMap: <B>(f: (value: A) => B): B => f(value),
  }
}
