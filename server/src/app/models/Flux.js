import mongoose from 'mongoose';

const FluxSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    eventApp: {
        type: String
    },
    actionApp: {
        type: String
    },
    eventName: {
        type: String
    },
    actionName: {
        type: String
    },
    eventInputs: {
        type: Object
    },
    actionInputs: {
        type: Object
    },
    isEnable: {
        type: Boolean
    },
    creationDate: {
    timestamps: true
  }
});

  const createFLux = mongoose.model('createFLux',FluxSchema);

  module.exports = createFlux;
