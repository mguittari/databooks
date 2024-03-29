const bookManager = require("../models/bookManager");

const getAllBooks = async (req, res) => {
  try {
    let { category, year } = req.query;

    const [books] = await bookManager.queryGetAllBooks(category, year);
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllBooksWithAuthors = async (req, res) => {
  try {
    const [rows] = await bookManager.queryGetAllBooksWithAuthors();
    res.send(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllBooksWithAuthorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await bookManager.queryGetAllBooksWithAuthorId(id);
    res.send(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const [book] = await bookManager.queryGetBookById(id);
    if (book[0] != null) {
      res.json(book[0]);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addNewBook = async (req, res) => {
  try {
    const book = req.body;
    const [result] = await bookManager.queryAddNewBook(book);
    if (result.affectedRows) {
      res.send(`Book created with id : ${result.insertId}`);
    } else {
      res.status(401).send("Unauthorized access");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, author_id } = req.body;
    const [result] = await bookManager.queryUpdateBook({
      title,
      year,
      author_id,
      id,
    });
    if (result.affectedRows) {
      res.send("Book updated !");
    } else {
      res.status(401).send("Unauthorized access");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await bookManager.queryDeleteBook(id);

    if (result.affectedRows) {
      res.send("Book deleted successfully");
    } else {
      res.status(401).send("Unauthorized access");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
  getAllBooksWithAuthors,
  getAllBooksWithAuthorId,
};
