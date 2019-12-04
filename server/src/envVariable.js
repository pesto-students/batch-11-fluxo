/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';
import path from 'path';

const devPath = path.resolve(process.cwd(), './.env');

dotenv.config({ path: devPath });

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_KEY = process.env.JWT_KEY;
const PORT = process.env.PORT || 5000;
const slackClientId = process.env.SLACK_CLIENT_ID;
const slackClientSecret = process.env.SLACK_CLIENT_SECRET;
const baseUri = process.env.BASE_URI || 'http://localhost:5000';

export {
  MONGODB_URI,
  JWT_KEY,
  PORT,
  slackClientId,
  slackClientSecret,
  baseUri,
};
