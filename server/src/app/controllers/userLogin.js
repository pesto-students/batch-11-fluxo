import {User,bcrypt,jwt} from '../constants/packageConfig';

export const userLogin =  async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      res.send("Email Not Found, User doesn't Exist!");
      return;
    }
  
    const comparePassword = await bcrypt.compare(password, user.password);
  
    if (comparePassword) {
      const token = await jwt.sign(
        {
          email
        },
        process.env.JWT_KEY,
        {
          expiresIn: "24h"
        }
      );
  
      res.json({token});
  
    } else {
      res.send("Password is incorrect, Please Try Again!");
    }
};