import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

const router = express.Router();

//Register Handle

router.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ emailAddress: email })
    .then(user => {
      if (user) {
        res.send('User is already registered');
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, (err, hash) => {
            if (err) throw err;
            
            newUser.password = hash;

            //save the new user
            newUser
              .save()
              .then(user => {
                res.send("React Login Component");
              })
              .catch(err => console.log(err));
          })
        );
      }
    })
    .catch(err => console.log(err));
});

//Login Handle

router.post("/login", (req, res, next) => {
});

//Logout Handle

router.get("/logout", (req, res) => {
  req.logout();
  res.send("React Login Component");
});

module.exports = router;
