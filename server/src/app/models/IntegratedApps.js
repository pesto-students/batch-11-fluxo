import mongoose from 'mongoose';

const { Schema } = mongoose;

const integratedAppsSchema = {
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
  },
  tpAppId: {
    type: Schema.Types.ObjectId,
    required: [true, 'ThirdParty App ID is required'],
  },
  appName: {
    type: String,
    required: [true, 'App name is required'],
  },
  accountName: {
    type: String,
    required: [true, 'Account name is required'],
  },
};

const IntegratedApps = mongoose.model('IntegratedApps', integratedAppsSchema);

export default IntegratedApps;
