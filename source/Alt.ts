import { Functor } from './Functor'

export interface Alt<T, K extends Exclude<keyof any, symbol | number>> extends Functor<T, K> {
    alt: (value: NonNullable<T>) => Alt<T, K>
    map: <B>(transform: (value: T) => B) => Alt<B, K>
}
