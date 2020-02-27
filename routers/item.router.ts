import * as express from 'express';
import itemApi from '../db/item.api';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { Role } from '../schemas/role.schema';
import { roleMiddleware } from '../middlewares/role.middleware';

export const itemRouter = express.Router({ mergeParams: true });

itemRouter.param('id', (req, res, next, id) => {
  try {
    const { collectionId } = req.params;
    req['item'] = itemApi.find(id, collectionId);
    next();
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

itemRouter.get('/', roleMiddleware(Role.regular), requireAuth, (req, res) => {
  const { collectionId } = req.params;
  const items = itemApi.get(collectionId);
  return res.json(items);
});

itemRouter.post('/', requireAuth, (req, res) => {
  const { collectionId } = req.params;
  const { name } = req.body;
  const id = itemApi.create(name, collectionId);
  return res.json({ id });
});

itemRouter.put('/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  itemApi.update(id, name);
  return res.end();
});

itemRouter.delete('/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  itemApi.delete(id);
  return res.end();
});
