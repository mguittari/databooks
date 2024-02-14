const bookManager = require("../models/bookManager");

const getAllBooks = async (req, res) => {
try {
 const [books] = await bookManager.queryGetAllBooks();
   res.send(books);
  } catch (error) {
     res.status(500).send(error);
  }
 };

const getBookById = async (req, res) => {
const { id } = req.params;
try {
      const [book] = await bookManager.queryGetBookById(id);
      res.json(book);
      console.log(book);
    } catch (error) {
      res.status(404).json({ error: "Book not found" });
    }
};

const addNewBook = async (req, res) => {
    try {
      const book = req.body;
      const [result] = await bookManager.queryAddNewBook(book);
      if (result.affectedRows) {
        console.log([result]);
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
      const [result] = await bookManager.queryUpdateBook(
        {title,
        year,
        author_id,
        id}
      );
      if (result.affectedRows) {
        res.send("Book updated !");
      } else {
        res.status(401).send("Unauthorized access");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };


 module.exports = { getAllBooks, getBookById, addNewBook, updateBook };