import { RoleSchema } from './role.schema';

export interface UserSchema {
  email: string;
  roles: RoleSchema[];
}
