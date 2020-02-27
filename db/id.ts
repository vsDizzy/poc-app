import * as nanoid from 'nanoid';

export type Entry<T> = Id & T;

interface Id {
  id: string;
}

export function newId(): string {
  return nanoid(4);
}

export function getEntries<T>(map: Map<string, T>): Entry<T>[] {
  return Array.from(map.entries()).map(([key, value]) => ({
    id: key,
    ...value
  }));
}
