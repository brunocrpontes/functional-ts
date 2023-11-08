export interface Functor<A> {
  map: <B>(f: (value: A) => B) => Functor<B>,
}
