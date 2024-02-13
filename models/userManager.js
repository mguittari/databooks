const AbstractManager = require("./abstractManager");

class UserManager extends AbstractManager {
  getAllUsers() {
    return this.database.query(
      `select firstname, lastname, email, city, language from users`
    );
  }
  getUserByEmail(value) {
    return this.database.query("select * from users where email = ?", [value]);
  }
  addUser() {}
}
module.exports = new UserManager();
