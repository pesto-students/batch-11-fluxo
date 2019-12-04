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
    email: 'cybertron612@gmail.com',
    password: 'abcd1234',
  };
  test('respond with 200 created', async () => {
    await req
      .post('/users/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('respond with error to be false', async () => {
    await req
      .post('/users/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect((res) => {
        res.body.error = false;
      });
  });

  test('respond with User is already registered', async () => {
    await req
      .post('/users/register')
      .send({
        email: 'vyasaditya41@live.com',
        password: 'abcd1234',
      })
      .set('Accept', 'application/json')
      .expect((res) => {
        res.body.message = 'User is already registered';
      });
  });
});
