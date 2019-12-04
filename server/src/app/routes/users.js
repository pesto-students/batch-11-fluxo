import express from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const router = express.Router();

//Login
router.get('/login', (req,res) => res.send('Login'));

//Register

router.get('/register', (req, res) => res.send('Register'));


//Register Handle

router.post('/register', (req, res) => {
    const {name, email, password, confPassword} = req.body;
    let errors = [];

    if(!name || !email || !password || !confPassword){
        errors.push('Please enter field value');
    }

    if(password !== confPassword) {
        errors.push('Passwords are not matching');
    }

    if(password.length < 8) {
        errors.push('Password should be greater than 7 characters');
    }

    if(errors.length > 0) {
        console.log(`You can't Proceed Further`);
    }else {
        User.findOne({emailAddress: email})
        .then(user => {
            if(user){
                console.log('User is Available in system'); 
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                
                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;

                    //save the new user
                    newUser.save()
                    .then(user => {
                        res.redirect('/users/login');
                    })
                    .catch((err) => console.log(err));  
                }));
            }
        })
        .catch(err => console.log(err));
    }
});

//Login Handle

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
    })(req, res, next);
});

//Logout Handle

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
})

module.exports = router;