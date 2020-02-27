import { groups, collections, items, users } from './sample-data.json';
import groupApi from '../db/group.api';
import { GroupSchema } from '../schemas/group.schema';
import collectionApi from '../db/collection.api';
import { CollectionSchema } from '../schemas/collection.schema';
import itemApi from '../db/item.api';
import { ItemSchema } from '../schemas/item.schema';
import { UserSchema } from '../schemas/user.schema';
import userApi from '../db/user.api';

export function loadData(): void {
  groupApi.groups = new Map(groups as Iterable<[string, GroupSchema]>);

  collectionApi.collections = new Map(
    collections as Iterable<[string, CollectionSchema]>
  );

  itemApi.items = new Map(items as Iterable<[string, ItemSchema]>);

  userApi.users = new Map(users as Iterable<[string, UserSchema]>);
}
