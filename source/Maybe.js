"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Just = exports.Nothing = exports.Maybe = void 0;
function isNone(value) {
    return value === null || value === undefined;
}
function Maybe(value) {
    if (isNone(value)) {
        return Nothing();
    }
    return Just(value);
}
exports.Maybe = Maybe;
function Nothing() {
    return {
        map: () => Nothing(),
        flatMap: () => Nothing()
    };
}
exports.Nothing = Nothing;
function Just(value) {
    return {
        map: (func) => Just(func(value)),
        flatMap: (func) => func(value)
    };
}
exports.Just = Just;
