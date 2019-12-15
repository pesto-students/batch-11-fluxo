import mongoose from 'mongoose';

const { Schema } = mongoose;

const FluxSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
  },
  eventApp: {
    type: String,
    lowercase: true,
    required: [true, 'Event App is required'],
  },
  actionApp: {
    type: String,
    lowercase: true,
    required: [true, 'Action App is required'],
  },
  eventName: {
    type: String,
    lowercase: true,
    required: [true, 'Event name is required'],
  },
  actionName: {
    type: String,
    required: true,
    lowercase: [true, 'Action name is required'],
  },
  eventDisplayName: {
    type: String,
    required: [true, 'Event display name is required'],
  },
  actionDisplayName: {
    type: String,
    lowercase: [true, 'Action name is required'],
  },
  eventAppId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Event App ID is required'],
  },
  actionAppId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Action App ID is required'],
  },
  eventInputs: {
    type: Map,
    required: [true, 'Event inputs cannot be empty'],
  },
  actionInputs: {
    type: Map,
    required: [true, 'Action inputs cannot be empty'],
  },
  isEnable: {
    type: Boolean,
    default: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const Flux = mongoose.model('Flux', FluxSchema);

export default Flux;
