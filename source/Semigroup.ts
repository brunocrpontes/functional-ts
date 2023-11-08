export interface Semigroup<A> {
  group: (part: A) => Semigroup<A>
}

