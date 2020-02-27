import * as express from 'express';
import collectionApi from '../db/collection.api';
import { itemRouter } from './item.router';
import { GroupSchema } from '../schemas/group.schema';

export const collectionRouter = express.Router({ mergeParams: true });
collectionRouter.use('/:collectionId', itemRouter);

collectionRouter.param('collectionId', (req, res, next, id) => {
  const { groupId } = req.params;
  const group: GroupSchema = req['group'];
  if (!group.collectionIds.some(x => x == id)) {
    return res.status(404).json({
      error: `Group '${groupId}' does not contain collection '${id}'.`
    });
  }

  next();
});

collectionRouter.get('/', (req, res) => {
  const group: GroupSchema = req['group'];
  const collections = collectionApi.get(group.collectionIds);
  return res.json(collections);
});

collectionRouter.post('/', (req, res) => {
  const { groupId } = req.params;
  const { name } = req.body;
  const id = collectionApi.create(name, groupId);
  return res.json({ id });
});

collectionRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  collectionApi.update(id, name);
  return res.end();
});

collectionRouter.delete('/:id', (req, res) => {
  const { groupId, id } = req.params;
  collectionApi.delete(id, groupId);
  return res.end();
});
