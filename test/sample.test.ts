import { groups, collections, items, users } from './sample-data.json';
import groupApi from '../db/group.api';
import collectionApi from '../db/collection.api';
import itemApi from '../db/item.api';
import userApi from '../db/user.api';

function loadMap(items: { id: string }[]): Map<string, unknown> {
  return new Map(items.map(x => [x.id, x]));
}

export function loadData(): void {
  groupApi.groups = loadMap(groups);
  collectionApi.collections = loadMap(collections);
  itemApi.items = loadMap(items);
  userApi.users = loadMap(users);
}
