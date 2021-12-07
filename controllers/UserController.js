const User = require('../models/User');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static async register(req, res) {
    try {
      const newUser = await User.register(req.body);
      if (newUser == "email_exist") {
        res.json({ message: "Email is already registered!" });
      } else {
        res.json({ ...newUser.rows[0], message: "Success" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const findUser = await User.login(email);
      if (findUser.rowCount > 0) {
        const loggedInUser = findUser.rows[0];
        const comparedPassword = comparePassword(password, loggedInUser.password);
        if (comparedPassword) {
          const token = generateToken({
            name: loggedInUser.name,
            email: loggedInUser.email,
          });
          res.json({
            name: loggedInUser.name,
            email: loggedInUser.email,
            token,
            message: 'Success',
          }); 
        } else {
          res.json({ message: "Email or password is incorrect!" });
        }
      } else {
        res.json({ message: "Email or password is incorrect!" });
      }
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = UserController;