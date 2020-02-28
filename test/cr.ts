import { loadData } from './sample.test';
import * as supertest from 'supertest';
import { Role } from '../schemas/role.schema';
import * as assert from 'assert';
import userApi from '../db/user.api';
import { getToken } from '../middlewares/jwt.middleware';
import { app } from '../express-app';

it('cr', done => {
  loadData();

  supertest(app)
    .post('/users')
    .set('Authorization', `Bearer ${getToken({ email: 'user1@mail.com' })}`)
    .send({
      email: 'new-user@mail.com',
      role: Role.globalManager
    })
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
