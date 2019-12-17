import slackAPI from './slackAPI/service';
import githubAPI from './githubAPI/service';

const initialize = () => {
  slackAPI.initialize();
  githubAPI.initialize();
};

export default { initialize };
