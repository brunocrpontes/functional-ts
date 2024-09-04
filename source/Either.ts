import { Bifunctor } from './Bifunctor';
import { id } from './identity';

export interface Left<L> extends Bifunctor<L, never, "Left"> {
  map: <A>(f: (value: never) => A) => Left<L>
  bimap: <L2, R2>(f1: (first: L) => L2, f2: (right: never) => R2) => Left<L2>
  first: <L2>(f: (left: L) => L2) => Left<L2>
  second: <R2>(f: (right: never) => R2) => Left<L>
  isLeft: () => true,
  isRight: () => false,
  either: <L2, R2>(fl: (l: L) => L2, fr: (r: never) => R2) => L2,
}

export interface Right<R> extends Bifunctor<never, R, "Right"> {
  map: <R2>(f: (value: R) => R2) => Right<R2>
  bimap: <L2, R2>(f1: (first: never) => L2, f2: (second: R) => R2) => Right<R2>
  first: <L2>(f: (left: never) => L2) => Right<R>
  second: <R2>(f: (right: R) => R2) => Right<R2>
  isLeft: () => false,
  isRight: () => true,
  either: <L2, R2>(fl: (l: never) => L2, fr: (r: R) => R2) => R2,
}

export function Left<L>(value: L): Left<L> {
  const map = <R2>(_: (value: never) => R2) => Left(value);
  const bimap = <L2, R2>(fl: (l: L) => L2, _: (r: never) => R2) => Left(fl(value))
  const first = <L2>(fl: (l: L) => L2) => bimap(fl, id)
  const second = <R2>(_: (r: never) => R2) => bimap(id, id)
  const isLeft = () => true as const
  const isRight = () => false as const
  const either = <L2, R2>(fl: (l: L) => L2, _: (r: never) => R2) => fl(value)

  return {
    _tag_: Left._tag_,
    map,
    bimap,
    first,
    second,
    isLeft,
    isRight,
    either
  }
}

Left._tag_ = "Left" as const

export function Right<R>(value: R): Right<R> {
  const map = <R2>(f: (value: R) => R2) => Right(f(value))
  const bimap = <L2, R2>(_: (l: never) => L2, fr: (r: R) => R2) => map(fr)
  const first = (_: (l: never) => any) => bimap(id, id)
  const second = <R2>(f: (r: R) => R2) => bimap(id, f)
  const isLeft = () => false as const
  const isRight = () => true as const
  const either = <L2, R2>(_: (l: never) => L2, fr: (r: R) => R2) => fr(value)

  return {
    _tag_: Right._tag_,
    map,
    bimap,
    first,
    second,
    isLeft,
    isRight,
    either
  }
}

Right._tag_ = "Right" as const

export const of = Right;

export type Either<L, R> = Left<L> | Right<R>;
