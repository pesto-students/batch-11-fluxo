import bcrypt from 'bcryptjs';
import User from '../models/User';
import generateJwt from '../constants/generateJwt';

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.send({ error: "Email Not Found, User doesn't Exist!", token: null });
    return;
  }
  try {
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      const token = await generateJwt(user._id, email);

      res.cookie('token', token, { maxAge: 90000, httpOnly: true });

      res.json({ error: null, token });
    } else {
      res.send({
        error: 'Password is incorrect, Please Try Again!',
        token: null,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export { userLogin };
