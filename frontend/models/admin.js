const bcrypt = require('bcrypt');

class Admin {
  constructor(email, password,id) {
    this.email = email;
    this.password = password;
    this.id=id;
  }

  async hashPassword() {
    try {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
      throw error;
    }
  }

  async comparePassword(password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Admin;
