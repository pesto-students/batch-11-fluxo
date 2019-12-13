import slackConfig from './slackAPI/config';
import githubConfig from './githubAPI/config';

const apps = {
  slack: slackConfig,
  github: githubConfig,
};

export default {
  apps,
};
