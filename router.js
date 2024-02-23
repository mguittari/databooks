const express = require("express");

const router = express.Router();

// const userController = require("./controllers/userController");
// router.get("/", (req, res) => {
//   res.send("welcome in my app");
// });


const bookController = require("./controllers/bookController");

router.get("/books", bookController.getAllBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", bookController.addNewBook);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

const authorController = require("./controllers/authorController");

router.get("/authors", authorController.getAllAuthors);
router.get("/authors/:id", authorController.getAuthorById);
router.post("/authors", authorController.addNewAuthor);
router.put("/authors/:id", authorController.updateAuthor);
router.delete("/authors/:id", authorController.deleteAuthor);
router.get("/authors/:id/books", authorController.getAllBooksByAuthor);

const hashPassword = require("./middlewares/hashPassword");
const verifyToken = require("./middlewares/auth");
const adminController = require("./controllers/adminController");

router.get("/admins", adminController.getAllAdmins);
router.post("/admins", hashPassword, adminController.addNewAdmin);
router.post("/login", adminController.getAdminByEmail);
router.get("/me", verifyToken, adminController.getAdminById);





module.exports = router;
