import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

export default {
  express,
  User,
  bcrypt,
  jwt,
  router,
};
