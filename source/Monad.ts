import { Functor } from "./Functor"

export interface Monad<T> extends Functor<T> {
    flatMap: <B>(transform: (value: T) => Monad<B>) => Monad<B>
    map: <B>(transform: (value: T) => B) => Monad<B>
}
