import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'asda2@asda2.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: email,
        password: '12345678',
      })
      .expect(201)
      .then((res) => {
        const { user, message } = res.body;
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toEqual(email);
        expect(message).toEqual('success');
      });
  });

  it('signin and get current login user', async () => {
    const email = 'asdf@asdf.com';
    const password = '12345678';

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password })
      .expect(201);

    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email, password })
      .expect(200);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/users/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.user.email).toEqual(email);
  });
});
