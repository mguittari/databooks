const AbstractManager = require("./abstractManager");


    class AdminManager extends AbstractManager {
    getAllAdmins() {
    return this.database.query(
    `select * from admin`
  );
    }   
    getAdminByEmail(value) {
    return this.database.query("select * from admin where email = ?", [value]);
    }
    queryAddNewAdmin({ username, email, hash_password }){
    return this.database.query(
    `insert into admin(username, email, hash_password) values(?, ?, ?)`, [username, email, hash_password]
    );
    }
    getAdminById(id) {
    return this.database.query(`select id as id_admin, username, email from admin where id = ?`, [id]);
  }

}
module.exports = new AdminManager();
