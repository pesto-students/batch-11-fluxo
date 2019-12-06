import {User,bcrypt} from '../constants/packageConfig';

export const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user) {
      res.send("User is already registered");
      return;
    }

    try {
      const newUser = new User({
        name,
        email,
        password
      });
  
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
  
      newUser.password = hash;
  
      await newUser.save();
      res.send("React Login Component");
    } catch (err) {
      res.send("Error");
    }
  };