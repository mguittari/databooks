const authorManager = require("../models/authorManager");

const getAllAuthors = async (req, res) => {
try {
 const [authors] = await authorManager.queryGetAllAuthors();
   res.send(authors);
  } catch (error) {
     res.status(500).send(error);
  }
};

const getAuthorById = async (req, res) => {
const { id } = req.params;
try {
      const [author] = await authorManager.queryGetAuthorById(id);
      if (author[0] != null) {
        res.json(author[0]);
      } else {
        res.status(404).send("Author not found");
      }
    } catch (error) {
      res.status(500).json(error);
    }
};

const getAllBooksByAuthor = async (req,res) =>{
        try{
            const {id} = req.params;
            const [result] = await authorManager.queryGetAllBooksByAuthor(id);
            
console.log(result[0]);
    if (result[0] != null && result[0].books != null && result[0].books.length > 0) {
        result[0].books.sort((a, b) => {
                const yearA = parseInt(a.result.split(', ')[1]);
                const yearB = parseInt(b.result.split(', ')[1]);
                return yearA - yearB;
            });
            console.log(result[0]);
            res.json(result);
        } else {
            res.status(401).send("Author does not exist or has no books");
        }
        } catch (error) {
            res.status(500).send(error.message);
        }
    };


const addNewAuthor = async (req, res) => {
    try {
      const author = req.body;
      const [result] = await authorManager.queryAddNewAuthor(author);
      if (result.affectedRows) {
        res.send(`Author created with id : ${result.insertId}`);
      } else {
        res.status(401).send("Unauthorized access");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

const updateAuthor = async (req, res) => {
    try {
      const { id } = req.params;
      const { firstname, lastname, birth_date, country, is_dead } = req.body;
      const [result] = await authorManager.queryUpdateAuthor(
        {firstname, lastname, birth_date, country, is_dead, id}
      );
      if (result.affectedRows) {
        res.send("Author updated !");
      } else {
        res.status(401).send("Unauthorized access");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const deleteAuthor = async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await authorManager.queryDeleteAuthor(id);

      if (result.affectedRows) {
        res.send("Author deleted successfully");
      } else {
        res.status(401).send("Unauthorized access");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };



 module.exports = { getAllAuthors, getAuthorById, addNewAuthor, updateAuthor, deleteAuthor, getAllBooksByAuthor };