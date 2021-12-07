const pool = require('../database/db');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class User {
  static async register(user) {
    let { name, age, email, password } = user;
    try {
      const findUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (findUser.rowCount > 0) {
        return "email_exist";
      } else {
        password = hashPassword(password);
        const newUser = await pool.query("INSERT INTO users (name, age, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [name, age, email, password]);
        return newUser;
      }
    } catch(e) {
      console.log(e.message);
    }
  }

  static async login(email) {
    try {
      const findUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      return findUser;
    } catch(err) {
      console.log(err.message);
    }
  }
}

module.exports = User;