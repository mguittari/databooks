const express = require("express");

const router = express.Router();

// const userController = require("./controllers/userController");
// router.get("/", (req, res) => {
//   res.send("welcome in my app");
// });


const bookController = require("./controllers/bookController");
const authorController = require("./controllers/authorController");
const adminController = require("./controllers/adminController");
const verifyToken = require("./middlewares/auth");
const hashPassword = require("./middlewares/hashPassword");

// route publique (il y en a une seule : formulaire pour se connecter au logiciel)

router.post("/login", adminController.getAdminByEmail);

// routes privées (il faut être connecté pour avoir accès aux fonctionnalités CRUD du logiciel)

router.use(verifyToken);

router.get("/books", bookController.getAllBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", bookController.addNewBook);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

router.get("/authors", authorController.getAllAuthors);
router.get("/authors/:id", authorController.getAuthorById);
router.post("/authors", authorController.addNewAuthor);
router.put("/authors/:id", authorController.updateAuthor);
router.delete("/authors/:id", authorController.deleteAuthor);
router.get("/authors/:id/books", authorController.getAllBooksByAuthor);

router.get("/admins", adminController.getAllAdmins);
router.post("/admins", hashPassword, adminController.addNewAdmin);
router.post("/login", adminController.getAdminByEmail);
router.get("/me", adminController.getAdminById);





module.exports = router;
