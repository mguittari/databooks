const AbstractManager = require("./abstractManager");

class BookManager extends AbstractManager {
  queryGetAllBooks(category, year) {
     let query = 'SELECT * FROM book';

  if (category && year) {
    query += ` WHERE REPLACE(category, ' ', '') = '${category}' AND year <= '${year}' ORDER BY year`;
  } else if (category) {
    query += ` WHERE REPLACE(category, ' ', '') = '${category}' ORDER BY year`;
  } else if (year) {
    query += ` WHERE year <= '${year}' ORDER BY year`;
  }

  return this.database.query(query);
}
  queryGetAllBooksWithAuthors() {
    return this.database.query(
    `SELECT a.firstname, a.lastname, b.title, b.year FROM author as a JOIN book as b ON a.id = b.author_id;`
    );
  }
  queryGetAllBooksWithAuthorId(id) {
    return this.database.query(
    `SELECT a.firstname, a.lastname, b.title, b.year
    FROM author as a
    JOIN book as b ON a.id = b.author_id
    WHERE a.id = ${id}
    ORDER BY year ASC`
    );
  }
  queryGetBookById(id) {
    return this.database.query(
    `select * from book where id = ${id}`
    );
  }
  queryAddNewBook({ title, year, author_id, category }){
    return this.database.query(
    `insert into book(title, year, author_id, category) values(?, ?, ?, ?)`, [title, year, author_id, category]
    );
  }
  queryUpdateBook({title, year, author_id, id}) {
    return this.database.query(
    `update book set title = ?, year = ?, author_id = ? where id =${id}`,
      [title, year, author_id, id]
    );
  }
  queryDeleteBook(id) {
    return this.database.query(`delete from book where id=${id}`);
  }
};

module.exports = new BookManager();