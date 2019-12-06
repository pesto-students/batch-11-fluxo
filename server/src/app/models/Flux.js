import mongoose from 'mongoose';

const FluxSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
