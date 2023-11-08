import { Functor } from "./Functor";

export interface Bifunctor<A1, A2> extends Functor<A2> {
  map: <B2>(f: (second: A2) => B2) => Bifunctor<A1, B2>
  bimap: <B1, B2>(f1: (first: A1) => B1, f2: (second: A2) => B2) => Bifunctor<B1, B2>
  first: <B1>(f: (first: A1) => B1) => Bifunctor<B1, A2>
  second: <B2>(f: (second: A2) => B2) => Bifunctor<A1, B2>
}