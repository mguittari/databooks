const AbstractManager = require("./abstractManager");

class BookManager extends AbstractManager {
  queryGetAllBooks(category) {
    let query = 'select * from book';
    
    if (category) {
      query += ` where replace(category, ' ', '') = '${category}'`;
    }
    

    return this.database.query(query);
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