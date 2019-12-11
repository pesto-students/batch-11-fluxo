import supertest from 'supertest';
import app from '../../app';

describe('Default Test for Thirdparty', () => {
  let req = null;
  let server = null;

  beforeAll((done) => {
    server = app.listen(done);
    req = supertest.agent(server);
  });

  afterAll((done) => {
    req.close(done);
  });

  test('Respond for default request', (done) => {
    req.get('/tp').expect(200).end(done);
  });
});
