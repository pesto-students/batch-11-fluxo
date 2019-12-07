import mongoose from 'mongoose';

const { Schema } = mongoose;

const integratedAppsSchema = {
  userId: Schema.Types.ObjectId,
  tpAppId: Schema.Types.ObjectId,
  appName: String,
  accountName: String,
};

const IntegratedApps = mongoose.model('IntegratedApps', integratedAppsSchema);

export default IntegratedApps;
