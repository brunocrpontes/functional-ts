export interface Functor<T> {
  map: <R>(f: (value: T) => R) => Functor<R>,
}
