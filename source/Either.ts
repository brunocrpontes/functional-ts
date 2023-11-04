import { Monad } from './Monad'

export interface Left<E, D> extends Monad<E> {
  isLeft: () => boolean,
  isRight: () => boolean,
  either: <A, B>(leftHandler: (left: E) => A, rightHandler: (right: D) => B) => A,
}

export interface Right<E, D> extends Monad<D> {
  isLeft: () => boolean,
  isRight: () => boolean,
  either: <A, B>(leftHandler: (left: E) => A, rightHandler: (right: D) => B) => B,
}

export function Left<E, D>(value: E): Left<E, D> {
  return {
    map: <R>(f: (value: E) => R) => Left(f(value)),
    flatMap: (f) => f(value),
    isLeft: () => true,
    isRight: () => false,
    either: <A, B>(leftHandler: (left: E) => A, _: (right: D) => B) => leftHandler(value),
  }
}

export function Right<E, D>(value: D): Right<E, D> {
  return {
    map: <R>(f: (value: D) => R) => Right(f(value)),
    flatMap: (f) => f(value),
    isLeft: () => false,
    isRight: () => true,
    either: <A, B>(_: (left: E) => A, rightHandler: (right: D) => B) => rightHandler(value),
  }
}

export type Either<E, D> = Left<E, D> | Right<E, D>;