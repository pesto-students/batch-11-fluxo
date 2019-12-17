import request from 'supertest';
import 'babel-polyfill';
import app from '../../app';
import db from '../../thirdparty/__tests__/util/inMemoryDb';

const req = request(app);

jest.setTimeout(30000);

describe('POST /users/register', () => {
  beforeAll(async () => {
    await db.createConnection();
  });

  afterAll(async () => {
    await db.closeConnection();
  });

  const data = {
    name: 'Aditya Vyas',
    email: 'vyasaditya41@live.com',
    password: 'abcd1234',
  };

  test('respond with error to be false', async () => {
    await req
      .post('/users/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.body.message).toBe('Account Created!');
      });
  });

  test('respond with User is already registered', async () => {
    await req
      .post('/users/register')
      .send({
        name: 'Aditya Vyas',
        email: 'vyasaditya41@live.com',
        password: 'abcd1234',
      })
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.body.error).toBe('User is already registered');
      });
  });

  test('respond with 200 created', async () => {
    await req
      .post('/users/login')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.error).toBe(null);
      });
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
        expect(res.body.error).toBe('Email Not Found, User doesn\'t Exist!');
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
        expect(res.body.error).toBe('Password is incorrect, Please Try Again!');
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
        expect(res.body.error).toBe(null);
      });
  });
});
