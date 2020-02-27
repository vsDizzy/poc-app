import { describe, it, beforeEach } from 'mocha';
import { app } from '../app';
import * as supertest from 'supertest';
import { Role } from '../schemas/role.schema';
import userApi from '../db/user.api';
import * as assert from 'assert';
import * as users from './users.json';
import { UserSchema } from '../schemas/user.schema';

beforeEach(() => {
  userApi.users.clear();
});

function loadUsers(): void {
  userApi.users = new Map<string, UserSchema>(
    users as Iterable<[string, UserSchema]>
  );
}

describe('get users', () => {
  it('should get list of users', done => {
    loadUsers();

    supertest(app)
      .get('/users')
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
    const newUser = {
      email: 'new-user@mail.cc',
      roles: [Role.globalManager]
    };

    supertest(app)
      .post('/users')
      .send(newUser)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const id = res.body;
        assert.ok(userApi.users.has(id));
        done();
      });
  });
});

describe('update user', () => {
  it('should update existing user', done => {
    loadUsers();

    const newUser = {
      email: 'new-user@mail.cc',
      roles: [Role.globalManager]
    };

    supertest(app)
      .put('/users/u1')
      .send(newUser)
      .expect(200)
      .end((err) => {
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
    loadUsers();

    supertest(app)
      .delete('/users/u1')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }

        assert.ok(!userApi.users.has('u1'));

        done();
      });
  });
});
