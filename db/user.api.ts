import { UserSchema } from '../schemas/user.schema';
import { newId, getEntries } from './id';

export class UserApi {
  users = new Map<string, UserSchema>();

  get(): UserSchema[] {
    return getEntries(this.users);
  }

  create(user: UserSchema): string {
    const id = newId();
    this.users.set(id, user);

    return id;
  }

  update(id: string, user: UserSchema): void {
    if (!this.users.has(id)) {
      throw new Error(`User '${id}' is not found.`);
    }

    this.users.set(id, user);
  }

  delete(id: string): void {
    if (!this.users.has(id)) {
      throw new Error(`User '${id}' is not found.`);
    }

    this.users.delete(id);
  }

  findUser(email: string): UserSchema {
    return [...this.users.values()].find(user => user.email == email);
  }
}

export default new UserApi();
