import { Functor } from "./Functor"
export interface Applicative<T> extends Functor<T> {
    apply: <F extends (arg: T) => any>(applicative: Applicative<F>) => Applicative<ReturnType<F>>
}