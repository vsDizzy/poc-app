import { UserSchema } from '../schemas/user.schema';
import { newId, Entry } from './id';
import { Role } from '../schemas/role.schema';

export class UserApi {
  users = new Map<string, Entry<UserSchema>>();

  create(user: UserSchema): string {
    const id = newId();
    this.users.set(id, { id, ...user });

    return id;
  }

  update(id: string, user: UserSchema): void {
    if (!this.users.has(id)) {
      throw new Error(`User '${id}' is not found.`);
    }

    this.users.set(id, { id, ...user });
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

  getRoleForGroup(user: UserSchema, groupId: string): Role {
    const rs = user.roles.find(x => x.groupId == groupId);
    return rs && rs.role;
  }

  getUsersForGroup(groupId: string): Entry<UserSchema>[] {
    return [...this.users.values()].filter(x =>
      x.roles.some(r => r.groupId == groupId)
    );
  }

  addRole(email: string, role: Role, groupId: string): string {
    const user = this.findUser(email);
    if (!user) {
      return this.create({ email, roles: [{ role, groupId }] });
    }

    user.roles.find(x => x.role == role && x.groupId == groupId);
    return;
  }
}

export default new UserApi();
