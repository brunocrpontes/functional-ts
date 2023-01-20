const sum = (a: number, b: number) => a + b
const double = (value: number) => value * 2
const isOdd = (value: number) => value % 2 === 0

function chunk<T>(items: T[], chunkSize: number, initial: T[][] = []): T[][] {
    const slices = items.length / chunkSize

    if (slices === 0) return initial;

    if(slices === 1) return initial.concat([items])

    const head = items.slice(0, chunkSize)
    const tail = items.slice(chunkSize)

    return chunk(tail, chunkSize, initial.concat([head]))
}
function map<T, B>(element: T[], transform: (value: T) => B, initial: B[] = []): B[] {
    return reduce(
        element,
        (current, value) => current.concat(transform(value)),
        initial
    )
}

function filter<T>(element: T[], predicate: (value: T) => boolean, initial: T[] = []): T[] {
    return reduce(
        element,
        (current, value) => {
            if(predicate(value)) return current.concat(value)
            return current;
        },
        initial
    )
}

function reduce<T, B>(element: T[], transform: (current: B, value: T) => B, initial: B): B {
    if(element.length < 1) return initial;

    const [head, ...tail] = element;
    const next = transform(initial, head)

    if(element.length === 1) return next

    return reduce(
        tail,
        transform,
        next
    )
}

const array = Array.from({length: 50}, (_, index) => index + 1);

const groups = chunk(array, 5)
const doubled = map(array, double)
const odd = filter(array, isOdd)
const summation = reduce(array, sum, 0)


console.log({
    groups,
    doubled,
    odd,
    summation,
})
