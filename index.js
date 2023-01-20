"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sum = (a, b) => a + b;
const double = (value) => value * 2;
const isOdd = (value) => value % 2 === 0;
function chunk(items, chunkSize, initial = []) {
    const slices = items.length / chunkSize;
    if (slices === 0)
        return initial;
    if (slices === 1)
        return initial.concat([items]);
    const head = items.slice(0, chunkSize);
    const tail = items.slice(chunkSize);
    return chunk(tail, chunkSize, initial.concat([head]));
}
function map(element, transform, initial = []) {
    return reduce(element, (current, value) => current.concat(transform(value)), initial);
}
function filter(element, predicate, initial = []) {
    return reduce(element, (current, value) => {
        if (predicate(value))
            return current.concat(value);
        return current;
    }, initial);
}
function reduce(element, transform, initial) {
    if (element.length < 1)
        return initial;
    const [head, ...tail] = element;
    const next = transform(initial, head);
    if (element.length === 1)
        return next;
    return reduce(tail, transform, next);
}
const array = Array.from({ length: 50 }, (_, index) => index + 1);
const groups = chunk(array, 5);
const doubled = map(array, double);
const odd = filter(array, isOdd);
const summation = reduce(array, sum, 0);
const summationOfDoubled = reduce(map(map(groups, value => reduce(value, sum, 0)), double), sum, 0);
console.log({
    groups,
    doubled,
    odd,
    summation,
    summationOfDoubled
});
