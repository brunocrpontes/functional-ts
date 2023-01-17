import { Functor } from './Functor'

export interface Alt<T> extends Functor<T> {
    alt: (value: NonNullable<T>) => Alt<T>
    map: <B>(transform: (value: T) => B) => Alt<B>
}
