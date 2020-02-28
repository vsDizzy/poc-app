import * as supertest from 'supertest';
import { app } from '../express-app';
import { loadData } from './sample.test';
import { getToken } from '../middlewares/jwt.middleware';
import * as assert from 'assert';
import itemApi from '../db/item.api';

describe('Collections auth', () => {
  it('should return 401 for anonymous', done => {
    loadData();
    supertest(app)
      .get('/g1/collections')
      .expect(401)
      .end(err => {
        done(err);
      });
  });

  it('should return 200 for regular', done => {
    loadData();
    supertest(app)
      .get('/g2/collections')
      .set('Authorization', `Bearer ${getToken({ email: 'user2@mail.com' })}`)
      .expect(200)
      .end(err => {
        done(err);
      });
  });
});

describe('Collections CRUD', () => {
  it('should return 404 for unexisting collectuion', done => {
    loadData();
    supertest(app)
      .get('/aa/collections')
      .set('Authorization', `Bearer ${getToken({ email: 'user1@mail.com' })}`)
      .expect(404)
      .end(err => {
        done(err);
      });
  });

  // TODO: This test breaks others because of parallel execution
  xit('should delete child items on delete', done => {
    loadData();
    supertest(app)
      .delete('/g1/collections/c1')
      .set('Authorization', `Bearer ${getToken({ email: 'user1@mail.com' })}`)
      .expect(200)
      .end(err => {
        if (err) {
          done(err);
        }

        assert.deepEqual([...itemApi.items.keys()], ['i3']);
        done();
      });
  });
});
