import * as ts from 'typescript/lib/tsserverlibrary';

type Promisify<T> = T extends Promise<unknown> ? T : Promise<T>;

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type ReplaceReturnType<T extends Function> = T extends (
  ...args: infer U
) => infer R
  ? (...args: U) => Promisify<R>
  : never;
type ApiProxy<T> = {
  [K in keyof FunctionProperties<T>]: ReplaceReturnType<T[K]>;
};

class Api {
  prop = 'aa';
  info: ts.server.PluginCreateInfo;
  as = (): Promise<number> => Promise.resolve(11);
  test1 = (a): number => 4;
  test2 = (a, b): number => 5;
}

const api = new Api();

//const r: ReturnType;

const pr: ApiProxy<Api> = api;
debugger;
