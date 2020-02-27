import { describe, it, beforeEach } from 'mocha';
import { app } from '../express-app';
import * as supertest from 'supertest';
import { Role } from '../schemas/role.schema';
import userApi from '../db/user.api';
import * as assert from 'assert';
import { getToken } from '../middlewares/jwt.middleware';
import { loadData } from './sample.test';

beforeEach(() => {
  userApi.users.clear();
});

describe('get users', () => {
  it('should get list of users', done => {
    loadData();

    supertest(app)
      .get('/users')
      .set('Authorization', `Bearer ${getToken({ email: 'user1@mail.com' })}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const users = res.body;
        assert.equal(users.length, 3);
        done();
      });
  });
});

describe('create user', () => {
  it('should create new user', done => {
    loadData();

    const newUser = {
      email: 'new-user@mail.com',
      roles: [Role.globalManager]
    };

    supertest(app)
      .post('/users')
      .set('Authorization', `Bearer ${getToken({ email: 'user1@mail.com' })}`)
      .send(newUser)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const { id } = res.body;
        assert.ok(userApi.users.has(id));
        done();
      });
  });
});

describe('update user', () => {
  it('should update existing user', done => {
    loadData();

    const newUser = {
      email: 'new-user@mail.com',
      roles: [Role.globalManager]
    };

    supertest(app)
      .put('/users/u1')
      .set('Authorization', `Bearer ${getToken({ email: 'user1@mail.com' })}`)
      .send(newUser)
      .expect(200)
      .end(err => {
        if (err) {
          return done(err);
        }

        assert.deepEqual(userApi.users.get('u1'), newUser);

        done();
      });
  });
});

describe('delete user', () => {
  it('should delete existing user', done => {
    loadData();

    supertest(app)
      .delete('/users/u1')
      .set('Authorization', `Bearer ${getToken({ email: 'user1@mail.com' })}`)
      .expect(200)
      .end(err => {
        if (err) {
          return done(err);
        }

        assert.ok(!userApi.users.has('u1'));

        done();
      });
  });
});
