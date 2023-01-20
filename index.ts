function chunk<T>(items: T[], chunkSize: number, initial: T[][] = []): T[][] {
    const slices = items.length / chunkSize

    if (slices === 0) return initial;

    if (slices === 1) return initial.concat([items])

    const head = items.slice(0, chunkSize)
    const tail = items.slice(chunkSize)

    return chunk(tail, chunkSize, initial.concat([head]))
}
function map<T, B>(items: T[], transform: (value: T) => B, initial: B[] = []): B[] {
    return reduce(
        items,
        (current, value) => current.concat(transform(value)),
        initial
    )
}

function every<T>(items: T[], predicate: (value: T) => boolean) {
    return reduce(
        items,
        (current, value) => predicate(value),
        false
    )
}
function some<T>(items: T[], predicate: (value: T) => boolean) {
    return reduce(
        items,
        (current, value) => predicate(value) || current,
        false
    )
}

function flat<T>(items: T[][], initial: T[] = []){
    return reduce(
        items,
        (current, item) => current.concat(item),
        initial
    )
}

function flatMap<T, B>(items: T[][], transform: (value: T) => B): B[] {
    return map(
        flat(items),
        transform,
    )
}

function filter<T>(items: T[], predicate: (value: T) => boolean, initial: T[] = []): T[] {
    return reduce(
        items,
        (current, value) => {
            if(predicate(value)) return current.concat(value)
            return current;
        },
        initial
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

const sum = (a: number, b: number) => a + b;
const double = (value: number) => value * 2;
const isOdd = (value: number) => value % 2 !== 0;
const isGreaterThanZero = (value: number) => value > 0
const isGreatherThanFifty = (value: number) => value > 50

const array = Array.from({length: 51}, (_, index) => index + 1);

const groups = chunk(array, 5)
const flattedGroups = flat(groups)
const flattedAndDoubled = flatMap(groups, double)
const doubled = map(array, double)
const odd = filter(array, isOdd)
const isEveryValueIsGreatherThan0 = every(array, isGreaterThanZero)
const hasSomeValueGreatherThan50 = some(array, isGreatherThanFifty)

const summation = reduce(array, sum, 0)


console.log({
    groups,
    flattedGroups,
    flattedAndDoubled,
    doubled,
    odd,
    summation,
    isEveryValueIsGreatherThan0,
    hasSomeValueGreatherThan50
})
