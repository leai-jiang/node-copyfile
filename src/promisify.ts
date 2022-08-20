type Callback<T> = (
  err: Error | null,
  res?: T
) => void;

export function promisify<A, T>(
  f: (
    arg: A,
    cb: Callback<T>,
    context?: any
  ) => void
): (arg: A) => Promise<T>;
export function promisify<A1, A2, T>(
  f: (
    arg1: A1,
    arg2: A2,
    cb: Callback<T>,
    context?: any
  ) => void
): (arg1: A1, arg2: A2) => Promise<T>;

export function promisify(f: any, context?: any) {
  return (...args: any) => {
    return new Promise((resolve, reject) => {
      args.push((err: any, result: any) =>
        err !== null
          ? reject(err)
          : resolve(result)
      );
      f.apply(context, args);
    });
  };
}
