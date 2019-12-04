import {Strategy} from 'passport-local';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';

module.exports = (passport) => {
    passport.use(
        new Strategy({emailAddressField: 'email'}, (email, password, done) => {
             User.findOne({email: email})
             .then(user => {
                 if(!user) {
                     return done(null, false, {message: 'The email is not registered'});
                 }

                 bcrypt.compare(password, user.password, (err, isMatch) => {
                     if(err) throw err;

                     if(isMatch) {
                         return done(null, user);   
                     }else {
                        return done(null, false, {message: 'Password is incorrect'});
                     }
                 });
             })
             .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}