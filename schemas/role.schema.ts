export enum Role {
  regular = 'regular',
  manager = 'manager',
  globalManager = 'globalManager'
}

export interface RoleSchema {
  role: Role;
  groupId: string; // for globalManager groupId is null
}
