import type { Functor } from "./Functor";

export interface Monad<A, K extends Exclude<keyof any, symbol | number>> extends Functor<A, K> {
  flatMap: <B>(f: (value: A) => B) => B;
};

export type MonadOf<M> = M extends Monad<infer A, any> ? A : M;
