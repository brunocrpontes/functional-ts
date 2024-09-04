import { Functor } from "./Functor";


export type Just<A = never> = Functor<A, "Just"> & {
  map: <B>(func: (value: A) => B) => Just<B>;
  get: (fallback?: A) => A;
}
export type Nothing = Functor<never, "Nothing"> & { 
  map: <B>(func: (value: never) => B) => Nothing;
  get: <A>(fallback?: A) => A
}

export type Maybe<T> = Nothing | Just<T>

export const Nothing: Nothing = {
  _tag_: "Nothing",
  map: <B>(_: (value: never) => B) => Nothing,
  get: <A>(fallback?: A) => fallback! 
}

export function Just<A = never>(value: A): Just<A> {
  return {
    _tag_: "Just",
    map: (func) => Just(func(value)),
    get: () => value
  }
}
