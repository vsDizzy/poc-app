import { GroupSchema } from '../schemas/group.schema';
import { Entry, getEntries, newId } from './id';
import collectionApi from './collection.api';

export class GroupApi {
  groups = new Map<string, GroupSchema>();

  get(): Entry<GroupSchema>[] {
    return getEntries(this.groups);
  }

  create(name: string): string {
    const id = newId();
    this.groups.set(id, { name, collectionIds: [] });

    return id;
  }

  update(id: string, name: string): void {
    const group = this.groups.get(id);
    if (!group) {
      throw new Error(`Group '${id}' is not found.`);
    }

    Object.assign(group, { name });
  }

  delete(id: string): void {
    const group = this.groups.get(id);
    if (!group) {
      throw new Error(`Group '${id}' is not found.`);
    }

    group.collectionIds.forEach(collectionId =>
      collectionApi.delete(collectionId, id)
    );
    this.groups.delete(id);
  }

  addCollection(groupId: string, collectionId: string): void {
    const group = this.groups.get(groupId);
    if (!group) {
      throw new Error(`Group '${groupId}' is not found.`);
    }

    group.collectionIds.push(collectionId);
  }

  removeCollection(groupId: string, collectionId: string): void {
    const group = this.groups.get(groupId);
    if (!group) {
      throw new Error(`Group '${groupId}' is not found.`);
    }

    group.collectionIds = group.collectionIds.filter(id => id != collectionId);
  }
}

export default new GroupApi();
