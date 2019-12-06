import { User, bcrypt, jwt, router } from '../constants/packageConfig';

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.send('User is already registered');
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
    const token = await jwt.sign(
      {
        email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '24h',
      },
    );
    res.send({ error: null, token });
  } catch (err) {
    res.send({ error: err, token: null });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  const user = await User.findOne({ email });

  if (!user) {
    res.send("Email Not Found, User doesn't Exist!");
    return;
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (comparePassword) {
    const token = await jwt.sign(
      {
        email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '24h',
      },
    );

    res.send({ token });
  } else {
    res.send('Password is incorrect, Please Try Again!');
  }
});

router.get('/logout', (req, res) => {
  res.send('React Login Component');
});

module.exports = router;
