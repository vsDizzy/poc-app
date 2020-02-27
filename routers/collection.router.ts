import * as express from 'express';
import collectionApi from '../db/collection.api';
import { itemRouter } from './item.router';
import { GroupSchema } from '../schemas/group.schema';
import { roleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../schemas/role.schema';
import { requireAuth } from '../middlewares/requireAuth.middleware';

export const collectionRouter = express.Router({ mergeParams: true });
collectionRouter.use(roleMiddleware(Role.manager));
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

collectionRouter.get(
  '/',
  roleMiddleware(Role.regular),
  requireAuth,
  (req, res) => {
    const group: GroupSchema = req['group'];
    const collections = collectionApi.get(group.collectionIds);
    return res.json(collections);
  }
);

collectionRouter.post('/', requireAuth, (req, res) => {
  const { groupId } = req.params;
  const { name } = req.body;
  const id = collectionApi.create(name, groupId);
  return res.json({ id });
});

collectionRouter.put('/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  collectionApi.update(id, name);
  return res.end();
});

collectionRouter.delete('/:id', requireAuth, (req, res) => {
  const { groupId, id } = req.params;
  collectionApi.delete(id, groupId);
  return res.end();
});
