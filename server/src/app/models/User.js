import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    validate(value) {
      // validation here
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      // validation here
    },
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
