import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    userId: {
        type: Number
    },
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
      validate(value) {
        // validation here
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        // validation here
      }
    }
  }, {
    timestamps: true
  });

  const User = mongoose.model('User',UserSchema);

  module.exports = User;
