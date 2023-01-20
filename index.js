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
function map(items, transform) {
    return reduce(items, (current, value) => current.concat(transform(value)), []);
}
function every(items, predicate, initial = false) {
    if (items.length < 1)
        return initial;
    const [head, ...tail] = items;
    const result = predicate(head);
    if (items.length === 1 || !result)
        return result;
    return every(tail, predicate, result);
}
function some(items, predicate, initial = false) {
    if (items.length < 1)
        return initial;
    const [head, ...tail] = items;
    const result = predicate(head);
    if (items.length === 1 || result)
        return result;
    return some(tail, predicate, result);
}
function flat(items) {
    return reduce(items, (current, item) => current.concat(item), []);
}
function flatMap(items, transform) {
    return map(flat(items), transform);
}
function filter(items, predicate) {
    return reduce(items, (current, value) => {
        if (predicate(value))
            return current.concat(value);
        return current;
    }, []);
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
const timed = (label, fn) => {
    console.time(label);
    const result = fn();
    console.timeEnd(label);
    return result;
};
const sum = (a, b) => a + b;
const double = (value) => value * 2;
const isOdd = (value) => value % 2 !== 0;
const isGreaterThanZero = (value) => value > 0;
const isGreatherThanFifty = (value) => value > 50;
const array = Array.from({ length: 51 }, (_, index) => index + 1);
const groups = timed("Chunk", () => chunk(array, 5));
const flattedGroups = timed("Flat", () => flat(groups));
const flattedAndDoubled = timed("FlatMap", () => flatMap(groups, double));
const doubled = timed("Map", () => map(array, double));
const odd = timed("Filter", () => filter(array, isOdd));
const isEveryValueIsGreatherThan0 = timed("Every", () => every(array, isGreaterThanZero));
const hasSomeValueGreatherThan50 = timed("Some", () => some(array, isGreatherThanFifty));
const summation = timed("Reduce", () => reduce(array, sum, 0));
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
