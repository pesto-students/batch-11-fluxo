const env = {
  slackClientId: process.env.SLACK_CLIENT_ID,
  slackClientSecret: process.env.SLACK_CLIENT_SECRET,
  baseUri: process.env.BASE_URI || 'http://localhost:5000',
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/test',
  port: process.env.PORT || 5000,
};

export default env;
