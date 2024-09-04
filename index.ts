import { IO } from "./source/IO";
import { Maybe, Just, Nothing } from "./source/Maybe";
import { Task } from "./source/Task";
import * as Terminal from "./source/terminal";

function chunk<T>(items: T[], chunkSize: number, initial: T[][] = []): T[][] {
  const slices = items.length / chunkSize;

  if (slices === 0) return initial;

  if (slices === 1) return initial.concat([items]);

  const head = items.slice(0, chunkSize);
  const tail = items.slice(chunkSize);

  return chunk(tail, chunkSize, initial.concat([head]));
}

function map<A, B>(items: A[], transform: (value: A) => B): B[] {
  return reduce<A, B[]>(
    items,
    (current, value) => current.concat(transform(value)),
    [],
  );
}

function every<A>(items: A[], predicate: (value: A) => boolean): boolean {
  if (items.length < 1) return true;

  return reduce(
    items,
    (previousPredicate, item) => previousPredicate && predicate(item),
    true,
  );
}

function some<T>(items: T[], predicate: (value: T) => boolean): boolean {
  if (items.length < 1) return false;

  return reduce(
    items,
    (previousPredicate, item) => previousPredicate || predicate(item),
    false,
  );
}

function flat<T>(items: T[][]): T[] {
  return reduce<T[], T[]>(items, (current, item) => current.concat(item), []);
}

function flatMap<T, B>(items: T[][], transform: (value: T) => B): B[] {
  return map(flat(items), transform);
}

function filter<T>(items: T[], predicate: (value: T) => boolean): T[] {
  return reduce(
    items,
    (current, value) => (predicate(value) ? current.concat(value) : current),
    [] as T[],
  );
}

function reduce<T, B>(
  items: T[],
  transform: (current: B, value: T) => B,
  initial: B,
): B {
  if (items.length < 1) return initial;

  const next = transform(initial, items[0]);

  return reduce(items.slice(1, items.length), transform, next);
}

const toUpperCase = (str: string): Maybe<string> => Just(str.toUpperCase())

const safeTerminalPuts = (str: Maybe<string>): IO<void> => {
  switch (str._tag_) {
    case "Just": 
      return Terminal.puts(str.get());

    case "Nothing":
      return Terminal.puts("`str` is empty!");
  }
}

Terminal.getInput("Qual o seu nome?\n")
  .map(toUpperCase)
  .map(safeTerminalPuts)
  .fork(
    (error) => Terminal.puts(error.message),
    (result) => Terminal.puts("Fim!")
  )
