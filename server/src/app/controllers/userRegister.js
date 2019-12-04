import bcrypt from 'bcryptjs';
import User from '../models/User';
import generateJwt from '../constants/generateJwt';

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.send({ error: 'User is already registered' });
    return;
  }

  try {
    const newUser = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser
      .save()
      .then(console.log('User Created'))
      .catch((err) => console.log(err));

    const token = await generateJwt(newUser._id, email);

    res.cookie('token', token, { maxAge: 90000, httpOnly: true });

    res.send({ error: 'Account Created!', token });
  } catch (err) {
    res.send({ error: 'Account cannot be created!', token: null });
  }
};

export { userRegister };
