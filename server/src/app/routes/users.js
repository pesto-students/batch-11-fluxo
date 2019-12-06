import { User, bcrypt, jwt, router } from '../constants/packageConfig';

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.send({err:'User is already registered',tokn: null});
    return;
  }

  try {
    const newUser = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);

    newUser.password = hash;

    await newUser.save().then(console.log('User Inserted'));

    const id = newUser._id;

    const token = await jwt.sign(
        {
          id,
          email
        },
        process.env.JWT_KEY,
        {
          expiresIn: '24h'
        }
      );

      console.log(token);

    res.send({error : null, token: token});
  } catch (err) {
    res.send({error: err, token: null});
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.send("Email Not Found, User doesn't Exist!");
    return;
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (comparePassword) {
    const id = user._id;
    const token = await jwt.sign(
        {
          id,
          email
        },
        process.env.JWT_KEY,
        {
          expiresIn: '24h'
        }
      );

    res.send({error: null, token: token });
  } else {
    res.send({err: 'Password is incorrect, Please Try Again!', token: null });
  }
});

router.get('/logout', (req, res) => {
  res.send('React Login Component');
});

module.exports = router;
