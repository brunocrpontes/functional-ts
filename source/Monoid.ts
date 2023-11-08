import { Semigroup } from "./Semigroup";

export interface Monoid<T> extends Semigroup<T> {
  empty: () => T
  concat: Semigroup<T>["group"]
}