import { Entry, getEntries, newId } from './id';
import { CollectionSchema } from '../schemas/collection.schema';
import itemApi from './item.api';
import groupApi from './group.api';

export class CollectionApi {
  collections = new Map<string, CollectionSchema>();

  get(): Entry<CollectionSchema>[] {
    return getEntries(this.collections);
  }

  create(name: string, groupId: string): string {
    const id = newId();
    this.collections.set(id, { name });

    groupApi.addCollection(groupId, id);

    return id;
  }

  update(id: string, name: string): void {
    const collection = this.collections.get(id);
    if (!collection) {
      throw new Error(`Collection '${id}' is not found.`);
    }

    Object.assign(collection, { name });
  }

  delete(id: string, groupId: string): void {
    if (!this.collections.has(id)) {
      throw new Error(`Collection '${id}' is not found.`);
    }

    itemApi.deleteCollectionItems(id);
    groupApi.removeCollection(groupId, id);
    this.collections.delete(id);
  }
}

export default new CollectionApi();
