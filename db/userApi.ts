import { UserSchema } from '../schemas/user.schema';
import { newId } from './id';

export class UserApi {
  users = new Map<string, UserSchema>();

  create(user: UserSchema): string {
    const id = newId();
    this.users.set(id, user);

    return id;
  }

  update(id: string, user: UserSchema): void {
    if (!this.users.has(id)) {
      throw new Error(`User '${id}' not found.`);
    }

    this.users.set(id, user);
  }

  delete(id: string): void {
    if (!this.users.has(id)) {
      throw new Error(`User '${id}' not found.`);
    }

    this.users.delete(id);
  }

  get(): UserSchema[] {
    return Array.from(this.users.values());
  }
}

export default new UserApi();
