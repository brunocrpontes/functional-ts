"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function map(items, transform, initial = []) {
    return reduce(items, (current, value) => current.concat(transform(value)), initial);
}
function every(items, predicate) {
    return reduce(items, (current, value) => predicate(value), false);
}
function some(items, predicate) {
    return reduce(items, (current, value) => predicate(value) || current, false);
}
function flat(items, initial = []) {
    return reduce(items, (current, item) => current.concat(item), initial);
}
function flatMap(items, transform) {
    return map(flat(items), transform);
}
function filter(items, predicate, initial = []) {
    return reduce(items, (current, value) => {
        if (predicate(value))
            return current.concat(value);
        return current;
    }, initial);
}
function reduce(items, transform, initial) {
    if (items.length < 1)
        return initial;
    const [head, ...tail] = items;
    const next = transform(initial, head);
    if (items.length === 1)
        return next;
    return reduce(tail, transform, next);
}
const sum = (a, b) => a + b;
const double = (value) => value * 2;
const isOdd = (value) => value % 2 === 0;
const isGreaterThanZero = (value) => value > 0;
const isGreatherThanFifty = (value) => value > 50;
const array = Array.from({ length: 51 }, (_, index) => index + 1);
const groups = chunk(array, 5);
const flattedGroups = flat(groups);
const flattedAndDoubled = flatMap(groups, double);
const doubled = map(array, double);
const odd = filter(array, isOdd);
const isEveryValueIsGreatherThan0 = every(array, isGreaterThanZero);
const hasSomeValueGreatherThan50 = some(array, isGreatherThanFifty);
const summation = reduce(array, sum, 0);
console.log({
    groups,
    flattedGroups,
    flattedAndDoubled,
    doubled,
    odd,
    summation,
    isEveryValueIsGreatherThan0,
    hasSomeValueGreatherThan50
});
