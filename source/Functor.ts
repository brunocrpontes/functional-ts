export interface Functor<A, K extends Exclude<keyof any, symbol | number>> {
  _tag_: K,
  map: <B>(f: (value: A) => B) => Functor<B, K>;
};

export type FunctorOf<F> = F extends Functor<infer A, any> ? A : any;
