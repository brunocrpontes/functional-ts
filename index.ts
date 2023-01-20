
function chunk<T>(items: T[], chunkSize: number, initial: T[][] = []): T[][] {
    const slices = items.length / chunkSize

    if (slices === 0) return initial;

    if (slices === 1) return initial.concat([items])

    const head = items.slice(0, chunkSize)
    const tail = items.slice(chunkSize)

    return chunk(tail, chunkSize, initial.concat([head]))
}

function map<T, B>(items: T[], transform: (value: T) => B): B[] {
    return reduce(
        items,
        (current, value) => current.concat(transform(value)),
        [] as B[]
    )
}

function every<T>(items: T[], predicate: (value: T) => boolean, initial: boolean = false): boolean {
    if(items.length < 1) return initial;

    const [head, ...tail] = items
    const result = predicate(head);

    if(items.length === 1 || !result) return result;

    return every(
        tail,
        predicate,
        result
    )
}

function some<T>(items: T[], predicate: (value: T) => boolean, initial: boolean = false): boolean {
    if(items.length < 1) return initial;

    const [head, ...tail] = items
    const result = predicate(head);

    if(items.length === 1 || result) return result;

    return some(
        tail,
        predicate,
        result
    )
}

function flat<T>(items: T[][]){
    return reduce(
        items,
        (current, item) => current.concat(item),
        [] as T[]
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
            if(predicate(value)) return current.concat(value)
            return current;
        },
        [] as T[]
    )
}

function reduce<T, B>(items: T[], transform: (current: B, value: T) => B, initial: B): B {
    if(items.length < 1) return initial;

    const [head, ...tail] = items;
    const next = transform(initial, head)

    if(items.length === 1) return next

    return reduce(
        tail,
        transform,
        next
    )
}

const timed = <F extends (...args: any[]) => any>(label: string, fn: F): ReturnType<F> => {
    console.time(label)
    const result = fn()
    console.timeEnd(label)
    return result;
}

const sum = (a: number, b: number) => a + b;
const double = (value: number) => value * 2;
const isOdd = (value: number) => value % 2 !== 0;
const isGreaterThanZero = (value: number) => value > 0
const isGreatherThanFifty = (value: number) => value > 50

const array = Array.from({length: 51}, (_, index) => index + 1);

const groups = timed("Chunk", () => chunk(array, 5))
const flattedGroups = timed("Flat", () => flat(groups))
const flattedAndDoubled = timed("FlatMap", () => flatMap(groups, double))
const doubled = timed("Map", () => map(array, double))
const odd = timed("Filter", () => filter(array, isOdd))
const isEveryValueIsGreatherThan0 = timed("Every", () => every(array, isGreaterThanZero))
const hasSomeValueGreatherThan50 = timed("Some", () => some(array, isGreatherThanFifty))
const summation = timed("Reduce", () => reduce(array, sum, 0))
