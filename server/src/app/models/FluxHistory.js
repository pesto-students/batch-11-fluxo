import mongoose from 'mongoose';

const { Schema } = mongoose;

const fluxHistorySchema = {
  fluxId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Flux ID is required'],
  },
  status: {
    type: Boolean,
    required: [true, 'Flux status is required'],
  },
  updatedTime: {
    type: Date,
    default: Date.now,
  },
};

const FluxHistory = mongoose.model('FluxHistory', fluxHistorySchema);

export default FluxHistory;
