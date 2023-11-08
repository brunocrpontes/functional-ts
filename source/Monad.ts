import type { Functor } from "./Functor"

export interface Monad<A> extends Functor<A> {
  map: <B>(f: (value: A) => B) => Monad<B>,
  flatMap: <B>(f: (value: A) => Monad<B>) => Monad<B>
}
