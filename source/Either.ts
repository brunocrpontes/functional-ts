import { Monad } from './Monad'

export type Left<L> = Monad<L> & {
    map: () => Left<L>;
    flatMap: () => Left<L>;
    right: (_: (result: never) => void) =>Left<L>,
    left: (_: (cause: L) => void) => Left<L>,
}

export type Right<R> = Monad<R> & {
    right: (_: (result: R) => void) => Right<R>,
    left: (_: (cause: never) => void) => Right<R>,
}

export type Either<L, R> = Right<R> | Left<L>

export function Either<L, R>(value: R): Either<L, R> {
    return Right(value)
}

export function Left<L>(reason: L): Left<L> {
    return {
        map: () => Left(reason),
        flatMap: () => Left(reason),
        left: (handle) => {
            handle(reason)
            return Left(reason)
        },
        right: () => Left(reason)
    }
}

export function Right<R>(value: R): Right<R> {
    return {
        map: (f) => Right(f(value)),
        flatMap: (f) => f(value),
        left: () => Right(value),
        right: (handle) => {
            handle(value)
            return Right(value)
        }
    }
}
