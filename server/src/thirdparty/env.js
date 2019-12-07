import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const env = {
  slackClientId: process.env.SLACK_CLIENT_ID,
  slackClientSecret: process.env.SLACK_CLIENT_SECRET,
  baseUri: process.env.BASE_URI || 'https://a91a7f8e.ngrok.io',
  mongoDBUri: process.env.MONGODB_URI || 'mongodb://localhost/test',
};

export default env;
