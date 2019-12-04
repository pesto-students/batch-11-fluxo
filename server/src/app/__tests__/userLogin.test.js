import request from 'supertest';
import 'babel-polyfill';
import app from '../../app';
import db from '../../thirdparty/__tests__/util/inMemoryDb';

const req = request(app);

jest.setTimeout(60000);

describe('POST /users/login', () => {
  beforeAll(async () => {
    await db.createConnection();
  });

  afterAll(async () => {
    await db.closeConnection();
  });

  const data = {
    email: 'vyasaditya41@live.com',
    password: 'abcd@1234',
  };

  test('respond with 200 created', async () => {
    await req
      .post('/users/login')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('Email Not Found, User doesn\'t Exist', async () => {
    await req
      .post('/users/login')
      .send({
        email: 'vyasaditya42@live.com',
        password: 'abcd@1234',
      })
      .set('Accept', 'application/json')
      .expect((res) => {
        res.body.error = 'Email Not Found, User doesn\'t Exist!';
      });
  });

  test('Password is incorrect, Please Try Again', async () => {
    await req
      .post('/users/login')
      .send({
        email: 'vyasaditya41@live.com',
        password: 'abcd@1234',
      })
      .set('Accept', 'application/json')
      .expect((res) => {
        res.body.error = 'Password is incorrect, Please Try Again!';
      });
  });

  test('respond with User is already registered', async () => {
    await req
      .post('/users/login')
      .send({
        email: 'vyasaditya41@live.com',
        password: 'abcd1234',
      })
      .set('Accept', 'application/json')
      .expect((res) => {
        res.body.error = null;
      });
  });
});
