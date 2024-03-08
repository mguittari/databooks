const AbstractManager = require("./abstractManager");

class UserManager extends AbstractManager {
  getAllUsers() {
    return this.database.query(
      `select *, DATE_FORMAT(created_at, '%Y-%m-%d_%H:%i:%s') AS created_at, DATE_FORMAT(updated_at, '%Y-%m-%d_%H:%i:%s') AS updated_at from user`
    );
  }
  getUserByEmail(value) {
    return this.database.query("select * from user where email = ?", [value]);
  }
  queryAddNewUser({ username, email, hash_password, role }) {
    return this.database.query(
      `insert into user(username, email, hash_password, role) values(?, ?, ?, ?)`,
      [username, email, hash_password, role]
    );
  }
  getUserById(id) {
    return this.database.query(
      `select id as id_user, username, email, role from user where id = ?`,
      [id]
    );
  }
  queryDeleteUser(id) {
    return this.database.query(`delete from user where id=${id}`);
  }
}

module.exports = new UserManager();
