import * as supertest from 'supertest';
import { app } from '../express-app';
import { loadData } from './sample.test';
import { getToken } from '../middlewares/jwt.middleware';
import * as assert from 'assert';
import itemApi from '../db/item.api';

describe('Items auth', () => {
  it('should return 401 for anonymous', done => {
    loadData();
    supertest(app)
      .get('/g1/collections/c1')
      .expect(401)
      .end(err => {
        done(err);
      });
  });

  it('should return 200 for globalManager', done => {
    loadData();
    supertest(app)
      .get('/g1/collections/c1')
      .set('Authorization', `Bearer ${getToken({ email: 'user1@mail.com' })}`)
      .expect(200)
      .end(err => {
        done(err);
      });
  });

  it('should return 403 for u3', done => {
    loadData();
    supertest(app)
      .get('/g1/collections/c1')
      .set('Authorization', `Bearer ${getToken({ email: 'user3@mail.com' })}`)
      .expect(403)
      .end(err => {
        done(err);
      });
  });

  it('should return 200 for manager', done => {
    loadData();
    supertest(app)
      .get('/g1/collections/c1')
      .set('Authorization', `Bearer ${getToken({ email: 'user2@mail.com' })}`)
      .expect(200)
      .end(err => {
        done(err);
      });
  });

  it('should return 200 for regular', done => {
    loadData();
    supertest(app)
      .get('/g3/collections/c2')
      .set('Authorization', `Bearer ${getToken({ email: 'user2@mail.com' })}`)
      .expect(200)
      .end(err => {
        done(err);
      });
  });
});

describe('Items CRUD', () => {
  it('should create new item', done => {
    loadData();
    supertest(app)
      .post('/g1/collections/c1')
      .set('Authorization', `Bearer ${getToken({ email: 'user2@mail.com' })}`)
      .send({ name: 'new item' })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.ok(res.body.id);
        assert.equal([...itemApi.items.entries()].length, 4);
        done();
      });
  });

  it(`shouldn't create new item in wrong group/collection`, done => {
    loadData();
    supertest(app)
      .post('/g1/collections/c2')
      .set('Authorization', `Bearer ${getToken({ email: 'user2@mail.com' })}`)
      .send({ name: 'new item' })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.deepEqual(res.body, {
          error: `Group 'g1' does not contain collection 'c2'.`
        });
        done();
      });
  });

  it('should update item', done => {
    loadData();
    supertest(app)
      .put('/g1/collections/c1/i1')
      .set('Authorization', `Bearer ${getToken({ email: 'user2@mail.com' })}`)
      .send({ name: 'new item' })
      .expect(200)
      .end(err => {
        if (err) {
          return done(err);
        }

        assert.deepEqual(itemApi.items.get('i1'), {
          id: 'i1',
          name: 'new item',
          parentId: 'c1'
        });
        done();
      });
  });

  it(`shouldn't update wrong item`, done => {
    loadData();
    supertest(app)
      .put('/g1/collections/c1/i3')
      .set('Authorization', `Bearer ${getToken({ email: 'user2@mail.com' })}`)
      .send({ name: 'new item' })
      .expect(404)
      .end(err => {
        done(err);
      });
  });

  it(`shouldn't allow regular user to delete`, done => {
    loadData();
    supertest(app)
      .delete('/g3/collections/c2/i3')
      .set('Authorization', `Bearer ${getToken({ email: 'user2@mail.com' })}`)
      .expect(403)
      .end(err => {
        done(err);
      });
  });
});
