import * as supertest from 'supertest';
import { app } from '../express-app';
import { loadData } from './sample.test';
import { getToken } from '../middlewares/jwt.middleware';

describe('Items auth', () => {
  it('should return 401 for anonymous', done => {
    loadData();
    supertest(app)
      .get('/groups/g1/c1')
      .expect(401)
      .end(err => {
        done(err);
      });
  });

  it('should return 200 for globalManager', done => {
    loadData();
    supertest(app)
      .get('/groups/g1/c1')
      .set('Authorization', `Bearer ${getToken({ email: 'user1@mail.com' })}`)
      .expect(200)
      .end(err => {
        done(err);
      });
  });

  it('should return 403 for u3', done => {
    loadData();
    supertest(app)
      .get('/groups/g1/c1')
      .set('Authorization', `Bearer ${getToken({ email: 'user3@mail.com' })}`)
      .expect(403)
      .end(err => {
        done(err);
      });
  });

  it('should return 200 for u2', done => {
    loadData();
    supertest(app)
      .get('/groups/g1/c1')
      .set('Authorization', `Bearer ${getToken({ email: 'user2@mail.com' })}`)
      .expect(200)
      .end(err => {
        done(err);
      });
  });
});
