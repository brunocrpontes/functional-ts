import { Functor } from "./Functor"
export interface Applicative<T, K extends Exclude<keyof any, symbol | number>> extends Functor<T, K> {
    apply: <F extends (arg: T) => any>(applicative: Applicative<F, K>) => Applicative<ReturnType<F>, K>
    map: <B>(transform: (value: T) => B) => Applicative<B, K>
}
