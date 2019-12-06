import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

module.exports = {
    express,
    User,
    bcrypt,
    jwt,
    router
}