import mongoose from 'mongoose';

const thirdPartyAppSchema = new mongoose.Schema({
  appName: {
    type: String,
    lowercase: true,
    required: [true, 'App name is required'],
  },
  token: {
    type: String,
    required: [true, 'Token is required'],
  },
  userDetails: {
    type: Map,
    of: String,
  },
  accountName: {
    type: String,
    required: [true, 'Account name is required'],
  },
});

const ThirdPartyApp = mongoose.model('ThirdPartyApp', thirdPartyAppSchema);


export default ThirdPartyApp;
