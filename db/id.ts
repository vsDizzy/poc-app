import * as nanoid from 'nanoid';

export function newId(): string {
  return nanoid(4);
}
