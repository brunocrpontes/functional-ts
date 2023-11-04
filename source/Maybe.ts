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

export function Just<T>(value: T): Just<T> {
  return {
    map: <R>(func: (value: T) => R) => Just(func(value)),
    flatMap: <NT, NR extends Just<NT>>(func: (value: T) => NR): NR => func(value),
  }
}
