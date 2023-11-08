import { Bifunctor } from './Bifunctor';
import { id } from './identity';

export interface Left<L> extends Bifunctor<L, never> {
  map: <A>(f: (value: never) => A) => Left<L>
  bimap: <L2, R2>(f1: (first: L) => L2, f2: (right: never) => R2) => Left<L2>
  first: <L2>(f: (left: L) => L2) => Left<L2>
  second: <R2>(f: (right: never) => R2) => Left<L>
  isLeft: () => boolean,
  isRight: () => boolean,
  either: <L2, R2>(fl: (l: L) => L2, fr: (r: never) => R2) => L2,
}

export interface Right<R> extends Bifunctor<never, R> {
  map: <R2>(f: (value: R) => R2) => Right<R2>
  bimap: <L2, R2>(f1: (first: never) => L2, f2: (second: R) => R2) => Right<R2>
  first: <L2>(f: (left: never) => L2) => Right<R>
  second: <R2>(f: (right: R) => R2) => Right<R2>
  isLeft: () => boolean,
  isRight: () => boolean,
  either: <L2, R2>(fl: (l: never) => L2, fr: (r: R) => R2) => R2,
}

export function Left<L>(value: L): Left<L> {
  const map = <R2>(_: (value: never) => R2) => Left(value);
  const bimap = <L2, R2>(fl: (l: L) => L2, _: (r: never) => R2) => Left(fl(value))
  const first = <L2>(fl: (l: L) => L2) => bimap(fl, id)
  const second = <R2>(_: (r: never) => R2) => bimap(id, id)
  const isLeft = () => false
  const isRight = () => true
  const either = <L2, R2>(fl: (l: L) => L2, fr: (r: never) => R2) => fl(value)

  return {
    map,
    bimap,
    first,
    second,
    isLeft,
    isRight,
    either
  }
}

export function Right<R>(value: R): Right<R> {
  const map = <R2>(f: (value: R) => R2) => Right(f(value))
  const bimap = <L2, R2>(_: (l: never) => L2, fr: (r: R) => R2) => map(fr)
  const first = (_: (l: never) => any) => bimap(id, id)
  const second = <R2>(f: (r: R) => R2) => bimap(id, f)
  const isLeft = () => false
  const isRight = () => true
  const either = <L2, R2>(fl: (l: never) => L2, fr: (r: R) => R2) => fr(value)

  return {
    map,
    bimap,
    first,
    second,
    isLeft,
    isRight,
    either
  }
}

export type Either<L, R> = Left<L> | Right<R>;