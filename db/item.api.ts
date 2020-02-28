import { Entry, newId } from './id';
import { ItemSchema } from '../schemas/item.schema';

export class ItemApi {
  items = new Map<string, ItemSchema>();

  get(collectionId: string): Entry<ItemSchema>[] {
    return [...this.items.entries()]
      .map(([k, v]) => ({ id: k, ...v }))
      .filter(v => v.parentId == collectionId);
  }

  create(name: string, parentId: string): string {
    const id = newId();
    this.items.set(id, { name, parentId });

    return id;
  }

  update(id: string, name: string): void {
    const item = this.items.get(id);
    if (!item) {
      throw new Error(`Item '${id}' is not found.`);
    }

    Object.assign(item, { name });
  }

  delete(id: string): void {
    if (!this.items.has(id)) {
      throw new Error(`Item '${id}' is not found.`);
    }

    this.items.delete(id);
  }

  deleteCollectionItems(collectionId: string): void {
    for (const [k, v] of this.items.entries()) {
      if (v.parentId == collectionId) {
        this.items.delete(k);
      }
    }
  }

  find(id: string, collectionId: string): ItemSchema {
    const item = this.items.get(id);
    if (!item) {
      throw new Error(`Item '${id}' is not found.`);
    }
    if (item.parentId != collectionId) {
      throw new Error(
        `Collection '${collectionId}' does not contain item '${id}'.`
      );
    }
    return item;
  }
}

export default new ItemApi();
