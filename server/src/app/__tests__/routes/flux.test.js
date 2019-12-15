import request from 'supertest';
import inMemDB from '../../../thirdparty/__tests__/util/inMemoryDb';
import app from '../../../app';
import integrationService from '../../service/integrationService';
import integratedAppService from '../../service/integratedAppService';
import fluxService from '../../service/fluxService';
import generateJwt from '../../constants/generateJwt';

const req = request(app);

describe('Integrated Apps', () => {
  let token = null;

  beforeAll(async () => {
    token = generateJwt('5df3950e1482a80e6ba78412', 'test@test.com');
    integrationService.start();
    await inMemDB.createConnection();
  });

  afterAll(async () => {
    await inMemDB.closeConnection();
  });

  const appData = {
    userId: '5df3950e1482a80e6ba78412',
    tpAppId: '5df3950e1482a80e6ba78404',
    appName: 'slack',
    accountName: 'fluxo',
  };

  test('Integrated apps should be populated', async () => {
    const result = await integratedAppService.addApp(appData);
    expect(result).toBe(true);
  });

  test('Should respond with list of integrated apps', (done) => {
    req.get('/apps')
      .expect('Content-Type', /json/)
      .set('Cookie', [`token=${token}`])
      .expect(200)
      .expect((response) => {
        expect(response.body.status).toBe('success');
        expect(response.body.data instanceof Array).toBe(true);
        expect(response.body.data[0].userId).toBe(appData.userId);
      })
      .end(done);
  });
});

describe('Flux', () => {
  let token = null;
  let fluxId = null;
  const userId = '5df3950e1482a80e6ba78412';

  beforeAll(async () => {
    token = generateJwt(userId, 'test@test.com');
    integrationService.start();
    await inMemDB.createConnection();
  });

  afterAll(async () => {
    await inMemDB.closeConnection();
  });

  const fluxData = {
    name: 'Flux One',
    eventApp: 'slack',
    actionApp: 'slack',
    eventName: 'message_channel',
    actionName: 'post_message_channel',
    eventDisplayName: 'Message posted to a channel',
    actionDisplayName: 'Post message to a channel',
    eventAppId: '5df3950e1482a80e6ba78404',
    actionAppId: '5df3950e1482a80e6ba78404',
    eventInputs: {
      channel: {
        value: 'CR14BBXB3',
      },
    },
    actionInputs: {
      text: {
        value: 'text',
        userProvided: false,
      },
      channel: {
        value: 'CR12QAJF3',
        userProvided: true,
      },
    },
  };

  test('Should able to add flux', (done) => {
    req.post('/flux')
      .expect('Content-Type', /json/)
      .set('Cookie', [`token=${token}`])
      .send(fluxData)
      .expect(200)
      .expect((response) => {
        expect(response.body.status).toBe('success');
        expect(response.body.data).toBe('Added successfully');
      })
      .end(done);
  });

  test('Should get the added flux', (done) => {
    req.get('/flux')
      .expect('Content-Type', /json/)
      .set('Cookie', [`token=${token}`])
      .expect(200)
      .expect((response) => {
        const { status, data } = response.body;
        expect(status).toBe('success');
        expect(data[0].name).toBe('Flux One');
        fluxId = data[0]._id;
      })
      .end(done);
  });

  test('Should get flux by ID', (done) => {
    req.get(`/flux/${fluxId}`)
      .expect('Content-Type', /json/)
      .set('Cookie', [`token=${token}`])
      .expect(200)
      .expect((response) => {
        expect(response.body.status).toBe('success');
        expect(response.body.data.name).toBe('Flux One');
      })
      .end(done);
  });

  test('Should able to search flux by name', (done) => {
    req.get('/flux/search?name=One')
      .expect('Content-Type', /json/)
      .set('Cookie', [`token=${token}`])
      .expect(200)
      .expect((response) => {
        expect(response.body.status).toBe('success');
        expect(response.body.data[0].name).toBe('Flux One');
      })
      .end(done);
  });

  test('Should update the flux', (done) => {
    fluxData.name = 'Sample flux';

    req.put(`/flux/${fluxId}`)
      .expect('Content-Type', /json/)
      .set('Cookie', [`token=${token}`])
      .send(fluxData)
      .expect(200)
      .expect((response) => {
        expect(response.body.status).toBe('success');
        expect(response.body.data).toBe('Updated successfully');
      })
      .end(done);
  });

  test('Should update the flux', async (done) => {
    fluxData.name = 'Sample flux';

    req.put(`/flux/${fluxId}`)
      .expect('Content-Type', /json/)
      .set('Cookie', [`token=${token}`])
      .send(fluxData)
      .expect(200)
      .expect(async (response) => {
        expect(response.body.status).toBe('success');
        expect(response.body.data).toBe('Updated successfully');
        const flux = await fluxService.getFlux(fluxId, userId);
        expect(flux.name).toBe('Sample flux');
      })
      .end(done);
  });

  test('Should delete the flux', async (done) => {
    req.delete(`/flux/${fluxId}`)
      .expect('Content-Type', /json/)
      .set('Cookie', [`token=${token}`])
      .send(fluxData)
      .expect(200)
      .expect(async (response) => {
        expect(response.body.status).toBe('success');
        expect(response.body.data).toBe('Deleted successfully');
        const flux = await fluxService.getFlux(fluxId, userId);
        expect(flux).toBe(null);
      })
      .end(done);
  });
});
