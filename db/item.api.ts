import { Entry, getEntries, newId } from './id';
import { ItemSchema } from '../schemas/item.schema';

export class ItemApi {
  items = new Map<string, ItemSchema>();

  get(): Entry<ItemSchema>[] {
    return getEntries(this.items);
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

  deleteGroupItems(groupId: string): void {
    for (const [k, v] of this.items.entries()) {
      if (v.parentId == groupId) {
        this.items.delete(k);
      }
    }
  }
}

export default new ItemApi();
