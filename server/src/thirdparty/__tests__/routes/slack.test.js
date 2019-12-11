import supertest from 'supertest';
import app from '../../../app';


describe('Static API Tests for slack', () => {
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
    req.get('/tp/slack').expect(200).end(done);
  });

  test('Should respond with list of actions', (done) => {
    req.get('/tp/slack/action')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => expect(response.body.status).toBe('success'))
      .end(done);
  });

  test('Should respond with list of events', (done) => {
    req.get('/tp/slack/event')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => expect(response.body.status).toBe('success'))
      .end(done);
  });

  test('Should respond challenge ID for challenge event', (done) => {
    req.post('/tp/slack/events')
      .send({ challenge: '1234' })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body.challenge).toBe('1234');
      })
      .end(done);
  });

  test('Should respond with success message for other slack events', async (done) => {
    req.post('/tp/slack/events')
      .send({ team_id: '1234', authed_users: ['123', '234'], event: 'test' })
      .expect(200)
      .then((response) => {
        expect(response.body.status).toBe('success');
        expect(response.body.data).toBe('Event received');
        done();
      });
  });
});
