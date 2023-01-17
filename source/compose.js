"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
function compose(func1, func2) {
    return (...args) => func2(func1(...args));
}
exports.compose = compose;
