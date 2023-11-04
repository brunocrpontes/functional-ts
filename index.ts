import { Either, Left, Right } from './source/Either';
import { Task } from './source/Task';
import { compose } from './source/compose'
import { pipe } from './source/pipe'
import { getInput, puts } from './source/terminal';

function chunk<T>(items: T[], chunkSize: number, initial: T[][] = []): T[][] {
  const slices = items.length / chunkSize

  if (slices === 0) return initial;

  if (slices === 1) return initial.concat([items])

  const head = items.slice(0, chunkSize)
  const tail = items.slice(chunkSize)

  return chunk(tail, chunkSize, initial.concat([head]))
}
function map<A, B>(items: A[], transform: (value: A) => B): B[] {
  return reduce<A, B[]>(
    items,
    (current, value) => current.concat(transform(value)),
    []
  )
}

function every<A>(items: A[], predicate: (value: A) => boolean): boolean {
  // if(items.length < 1) return initial;
  //
  // const [head, ...tail] = items
  // const result = predicate(head);
  //
  // if(items.length === 1 || !result) return result;
  //
  // return every(
  //     tail,
  //     predicate,
  //     result
  // )

  return reduce(
    items,
    (previousPredicate, item) => previousPredicate && predicate(item),
    true
  )
}

function some<T>(items: T[], predicate: (value: T) => boolean): boolean {
  // if(items.length < 1) return initial;
  //
  // const [head, ...tail] = items
  // const result = predicate(head);
  //
  // if(items.length === 1 || result) return result;
  //
  // return some(
  //     tail,
  //     predicate,
  //     result
  // )

  return reduce(
    items,
    (previousPredicate, item) => previousPredicate || predicate(item),
    false
  )
}

function flat<T>(items: T[][]): T[] {
  return reduce<T[], T[]>(
    items,
    (current, item) => current.concat(item),
    []
  )
}

function flatMap<T, B>(items: T[][], transform: (value: T) => B): B[] {
  return map(
    flat(items),
    transform,
  )
}

function filter<T>(items: T[], predicate: (value: T) => boolean): T[] {
  return reduce(
    items,
    (current, value) => {
      if (predicate(value)) return current.concat(value)
      return current;
    },
    [] as T[]
  )
}

function reduce<T, B>(items: T[], transform: (current: B, value: T) => B, initial: B): B {
  if (items.length < 1) return initial;

  const [head, ...tail] = items;
  const next = transform(initial, head)

  return reduce(
    tail,
    transform,
    next
  )
}


getInput("Qual o seu nome?").fork((input => input.map(name => puts(`O meu nome é ${name}`))), console.error)