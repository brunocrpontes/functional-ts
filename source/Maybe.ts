import { Monad } from './Monad'

type None = null | undefined;

function isNone(value: any): value is None {
    return value === null || value === undefined
}

export type Just<T> = Monad<T>
export type Nothing = Monad<never>
export type Maybe<T> = Nothing | Just<T>
export function Maybe<T>(value: T | None): Maybe<T> {
    if(isNone(value)) {
        return Nothing()
    }

    return Just(value)
}

export function Nothing(): Nothing {
    return {
        map: () => Nothing(),
        flatMap: () => Nothing()
    }
}

export function Just<T>(value: T): Just<T> {
    return {
        map: (func) => Just(func(value)),
        flatMap: (func) => func(value)
    }
}
