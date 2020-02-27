import * as express from 'express';

export const requireAuth: express.Handler = (req, res, next) => {
  if (req['isAuthorized']) {
    return next();
  }

  res.status(403).json({ error: 'Forbidden.' });
};
