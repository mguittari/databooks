const AbstractManager = require("./abstractManager");

class AuthorManager extends AbstractManager {
  queryGetAllAuthors() {
    return this.database.query(
    `select *, DATE_FORMAT(birth_date, '%d-%m-%y') AS birth_date from author`
    );
  }
};

module.exports = new AuthorManager();