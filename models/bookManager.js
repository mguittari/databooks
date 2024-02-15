const AbstractManager = require("./abstractManager");

class BookManager extends AbstractManager {
  queryGetAllBooks() {
    return this.database.query(
    `select * from book`
    );
  }
  queryGetBookById(id) {
    return this.database.query(
    `select * from book where id = ${id}`
    );
  }
  queryAddNewBook({ title, year, author_id }){
    return this.database.query(
    `insert into book(title, year, author_id) values(?, ?, ?)`, [title, year, author_id]
    );
  }
  queryUpdateBook({title, year, author_id, id}) {
    return this.database.query(
    `update book set title = ?, year = ?, author_id = ? where id = ?`,
      [title, year, author_id, id]
    );
  }
  queryDeleteBook(id) {
    return this.database.query(`delete from book where id=${id}`);
  }
};

module.exports = new BookManager();