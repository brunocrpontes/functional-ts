import { Monad } from "./Monad";

export interface IO<T> extends Monad<T, "IO"> {
  map: <R>(f: (value: T) => R) => IO<R>;
  flatMap: <R>(f: (value: T) => R) => R;
}

export function IO<T>(value: T): IO<T> {
  return {
    _tag_: "IO",
    map: <R>(f: (value: T) => R) => IO(f(value)),
    flatMap: <R>(f: (value: T) => R) => f(value),
  };
}
