import * as nanoid from 'nanoid';

export type Entry<T> = Id & T;

interface Id {
  id: string;
}

export function newId(): string {
  return nanoid(4);
}
