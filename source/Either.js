"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Right = exports.Left = exports.Either = void 0;
function Either(value) {
    return Right(value);
}
exports.Either = Either;
function Left(reason) {
    return {
        isLeft: true,
        isRight: false,
        map: () => Left(reason),
        flatMap: () => Left(reason),
        left: (handle) => {
            handle(reason);
            return Left(reason);
        },
        right: () => Left(reason)
    };
}
exports.Left = Left;
function Right(value) {
    return {
        isLeft: false,
        isRight: true,
        map: (f) => Right(f(value)),
        flatMap: (f) => f(value),
        left: () => Right(value),
        right: (handle) => {
            handle(value);
            return Right(value);
        }
    };
}
exports.Right = Right;
