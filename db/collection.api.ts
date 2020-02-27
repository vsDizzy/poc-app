import { Entry, getEntries, newId } from './id';
import { CollectionSchema } from '../schemas/collection.schema';
import itemApi from './item.api';

export class CollectionApi {
  collections = new Map<string, CollectionSchema>();

  get(): Entry<CollectionSchema>[] {
    return getEntries(this.collections);
  }

  create(name: string): string {
    const id = newId();
    this.collections.set(id, { name });

    return id;
  }

  update(id: string, name: string): void {
    const collection = this.collections.get(id);
    if (!collection) {
      throw new Error(`Collection '${id}' is not found.`);
    }

    Object.assign(collection, { name });
  }

  delete(id: string): void {
    if (!this.collections.has(id)) {
      throw new Error(`Collection '${id}' is not found.`);
    }

    itemApi.deleteGroupItems(id);
    this.collections.delete(id);
  }
}

export default new CollectionApi();
