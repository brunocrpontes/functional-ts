import { Functor } from "./Functor";

export interface Bifunctor<A1, A2, K extends Exclude<keyof any, symbol | number>> extends Functor<A2, K> {
  map: <B2>(f: (second: A2) => B2) => Bifunctor<A1, B2, K>
  bimap: <B1, B2>(f1: (first: A1) => B1, f2: (second: A2) => B2) => Bifunctor<B1, B2, K>
  first: <B1>(f: (first: A1) => B1) => Bifunctor<B1, A2, K>
  second: <B2>(f: (second: A2) => B2) => Bifunctor<A1, B2, K>
}