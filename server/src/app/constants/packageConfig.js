import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

module.exports = {
  express,
  User,
  bcrypt,
  jwt,
  router,
};
