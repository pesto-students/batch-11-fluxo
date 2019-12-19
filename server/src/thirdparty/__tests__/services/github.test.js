import request from 'supertest';
import app from '../../../app';

describe('Should return services and actions accordingly', () => {
  test('should return the list of services', async () => {
    const res = await request(app)
      .get('/tp/github/')
      .send();

    expect(res.statusCode).toEqual(200);
  });

  test('should return the actions for github service', async () => {
    const res = await request(app)
      .get('/tp/github/action')
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status');
  });

  test('should return the triggers for github service', async () => {
    const res = await request(app)
      .get('/tp/github/event')
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status');
  });
});
