const authorManager = require("../models/authorManager");

const getAllAuthors = async (req, res) => {
try {
 const [authors] = await authorManager.queryGetAllAuthors();
   res.send(authors);
  } catch (error) {
     res.status(500).send(error);
  }
 };

 module.exports = { getAllAuthors };