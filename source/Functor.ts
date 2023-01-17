import { compose } from './compose'

export interface Functor<T> {
    map: <B>(transform: (value: T) => B) => Functor<B>
}
