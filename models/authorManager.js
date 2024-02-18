const AbstractManager = require("./abstractManager");

class AuthorManager extends AbstractManager {
  queryGetAllAuthors() {
    return this.database.query(
    `select *, DATE_FORMAT(birth_date, '%d-%m-%Y') AS birth_date from author`
    );
  }
  queryGetAuthorById(id) {
    return this.database.query(
    `select *, DATE_FORMAT(birth_date, '%d-%m-%Y') AS birth_date from author where id = ${id}`
    );
  }
  queryGetAllBooksByAuthor(id) {
    return this.database.query(
      `SELECT a.id, a.firstname, a.lastname, JSON_ARRAYAGG(
      JSON_OBJECT(
      'result', CONCAT(b.title, ', ', b.year)
        )
        ) AS books
      FROM author AS a
      JOIN book AS b ON a.id = b.author_id
      WHERE a.id = ${id}
      `
    );
  }
  queryAddNewAuthor({ firstname, lastname, birth_date, country, is_dead }){
    return this.database.query(
    `insert into author(firstname, lastname, birth_date, country, is_dead) values(?, ?, ?, ?, ?)`, [firstname, lastname, birth_date, country, is_dead]
    );
  }
  queryUpdateAuthor({firstname, lastname, birth_date, country, is_dead, id}) {
    return this.database.query(
    `update author set firstname = ?, lastname = ?, birth_date = ?, country = ?, is_dead = ? where id =${id}`,
      [firstname, lastname, birth_date, country, is_dead, id]
    );
  }
  queryDeleteAuthor(id) {
    return this.database.query(`delete from author where id=${id}`);
  }
};

module.exports = new AuthorManager();