import slackService from '../../slackAPI/service';
import config from '../../slackAPI/config';
import inMemDB from '../util/inMemoryDb';
import tpEvent from '../../event';

describe('Slack default values', () => {
  test('Should have correct app name', () => {
    expect(config.appName).toBe('slack');
  });

  test('Should have correct API url', () => {
    expect(config.api).toBe('https://slack.com');
  });

  test('Should have correct API url', () => {
    expect(config.api).toBe('https://slack.com');
  });

  test('Should have events', () => {
    expect(config.event).not.toBe(undefined);
  });

  test('Should have actions', () => {
    expect(config.action).not.toBe(undefined);
  });
});

describe('Slack urls', () => {
  test('Should have proper auth url', () => {
    const authUrl = slackService.getAuthUrl(123);
    expect(authUrl).toMatch(/client_id/);
    expect(authUrl).toMatch(/client_secret/);
    expect(authUrl).toMatch(/redirect_uri/);
    expect(authUrl).toMatch(/code=123/);
  });

  test('Should have proper Integrate url', () => {
    const integUrl = slackService.getIntegUrl(1234);
    expect(integUrl).toMatch(/client_id/);
    expect(integUrl).toMatch(/scope/);
    expect(integUrl).toMatch(/redirect_uri/);
    expect(integUrl).toMatch(/state=1234/);
  });
});

describe('Slack service', () => {
  beforeAll(async () => {
    await inMemDB.createConnection();
  });

  afterAll(async () => {
    await inMemDB.closeConnection();
  });

  const authData = {
    ok: true,
    team_name: 'test',
    access_token: 'abcd1234',
    user_id: '1234',
    team_id: '4321',
  };


  const newAppAddedFn = jest.fn();
  tpEvent.on('appAdded', newAppAddedFn);

  test('It should add integration', async () => {
    expect(await slackService.addOrUpdateIntegration(authData, 'user123')).toBe(true);
  });

  authData.access_token = 'abcd12345';

  test('It should update integration', async () => {
    expect(await slackService.addOrUpdateIntegration(authData, 'user123')).toBe(true);
  });

  test('App added and updated event is triggered', async () => {
    expect(newAppAddedFn).toBeCalled();

    expect(newAppAddedFn.mock.calls.length).toBe(2);

    expect(newAppAddedFn).toBeCalledWith(expect.anything(), 'user123');
  });
});
