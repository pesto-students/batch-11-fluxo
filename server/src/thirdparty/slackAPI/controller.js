import axios from 'axios';
import env from '../env';
import ThirdPartyApp from '../models/ThirdPartyApp';
import slackAPI from './index';
import config from './config';



const setSuccessMessage = data => {
  return { status: 'success', data };
}

const setFailureMessage = data => {
  return { status: 'failure', data };
}

const authCallBack = (req, res) => {
  if (req.query.code === undefined || req.query.code === '') {
    res.send(setFailureMessage('Code is empty'));
  }
  else {
    axios.get(`https://slack.com/api/oauth.access?client_id=${env.slackClientId}&client_secret=${env.slackClientSecret}&code=${req.query.code}&redirect_uri=${encodeURIComponent(env.baseUri + '/tp/slack/auth/redirect')}`)
      .then(response => {
        console.log(response);
        addIntegration(response.data).then(result => {
          res.send(setSuccessMessage('success'));
        }, err => {
          res.send(setFailureMessage(err));
        });
    })
  }
}

const eventCallback = (req, res) => {
  const { team_id, authed_users, event } = req.body;
  const eventJson = { event };
  eventJson['appName'] = 'slack';
  ThirdPartyApp.
    find({
      'userDetails.team_id': team_id,
      'userDetails.user_id': { $in: authed_users },
    }).
    select({ _id: 1 }).
    exec((err, apps) => {
      eventJson['integratedApps'] = apps.map(app => app._id);
      slackAPI.onEvent(eventJson);
    });
  
  res.send(setSuccessMessage('Got event'));
}

const getEvents = (_, res) => {
  res.send(config.event);
}

const getActions = (_, res) => {
  res.send(config.action);
}

const getIntegUrl = () => {
  return `https://slack.com/oauth/authorize?scope=bot,channels:history,channels:read,chat:write:bot&client_id=${env.slackClientId}&redirect_uri=${encodeURIComponent(env.baseUri + '/tp/slack/auth/redirect')}`;
}

const addIntegration = (jsonObject) => {
  if (jsonObject.ok === false) {
    return new Promise().reject('Access token generation failed');
  }

  const slackInteg = new ThirdPartyApp({
    appName: 'slack',
    accountName: jsonObject['team_name'],
    token: jsonObject['access_token'],
    userDetails: { user_id: jsonObject['user_id'], team_id: jsonObject['team_id'] },
  });

  return new Promise((resolve, reject) => {
    slackInteg.save((err, model) => {
      console.log('Added integ object');
      if (err) {
        reject(err)
      }
      resolve('success');
    });
  })
};

const performAction = async (actionData) => {
  try {
    console.log(actionData);
    const actionObj = config.action[actionData.action];
    const { token } = await ThirdPartyApp.
      findOne({
        '_id': actionData.integId,
      }).
      select({ token: 1, _id: 0 }).
      exec();
    console.log(token);

    const body = actionObj.inputs.reduce((acc, input) => {
      if (actionData[input] !== undefined) {
        acc[input] = actionData[input];
      }
      return acc;
    }, {});

    axios.post(actionObj.endpoint, body, {
      headers: {'Authorization': `Bearer ${token}`}
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  } catch (err) {
    console.log(err);
  }
}

slackAPI.registerActionCB(performAction);


export default {
  authCallBack,
  getIntegUrl,
  eventCallback,
  performAction,
  getEvents,
  getActions,
};

