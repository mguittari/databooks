const db = require("../database/database");
class AbstractManager {
  constructor() {
    this.database = db;
  }
  read(table) {
    return `select * from ${table}`;
  }
}

module.exports = AbstractManager;
