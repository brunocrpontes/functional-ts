export function compose<F1 extends (...args: any[]) => any, F2 extends (arg: ReturnType<F1>) => any>(func1: F1, func2: F2) {
    return (...args: Parameters<F1>) => func2(func1(...args))
}
