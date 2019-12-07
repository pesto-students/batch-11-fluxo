import mongoose from 'mongoose';

const { Schema } = mongoose;

const FluxSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  userId: Schema.Types.ObjectId,
  eventApp: {
    type: String,
    required: true,
    lowercase: true,
  },
  actionApp: {
    type: String,
    required: true,
    lowercase: true,
  },
  eventName: {
    type: String,
    required: true,
    lowercase: true,
  },
  actionName: {
    type: String,
    required: true,
    lowercase: true,
  },
  eventAppId: Schema.Types.ObjectId,
  actionAppId: Schema.Types.ObjectId,
  eventInputs: {
    type: Map,
    required: true,
  },
  actionInputs: {
    type: Map,
    required: true,
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
=======
  userId: {
    type: String,
    unique: true,
  },
  eventApp: {
    type: String,
  },
  actionApp: {
    type: String,
  },
  eventName: {
    type: String,
  },
  actionName: {
    type: String,
  },
  eventInputs: {
    type: Object,
  },
  actionInputs: {
    type: Object,
  },
  isEnable: {
    type: Boolean,
  },
});

const Flux = mongoose.model('Flux', FluxSchema, 'flux');

module.exports = Flux;
>>>>>>> 22990b036e272b2a2733f7698b4a2338268c2395
