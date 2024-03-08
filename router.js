const express = require("express");

const router = express.Router();

const bookController = require("./controllers/bookController");
const authorController = require("./controllers/authorController");
const userController = require("./controllers/userController");
const { verifyToken } = require("./middlewares/auth");
const hashPassword = require("./middlewares/hashPassword");
const isAdmin = require("./middlewares/isAdmin");

// route publique (il y en a une seule : formulaire pour se connecter au logiciel)

router.post("/login", userController.getUserByEmail);

// routes bibliothécaires (il faut être connecté pour avoir accès aux fonctionnalités CRUD du logiciel)

router.use(verifyToken);

router.get("/me", userController.getUserById);
router.post("/logout", userController.logout);

router.get("/books", bookController.getAllBooks);
router.get("/books-authors", bookController.getAllBooksWithAuthors);
router.get("/books-authors/:id", bookController.getAllBooksWithAuthorId);
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

// routes admins (l'admin gère les comptes des bibliothécaires en plus des autres fonctionnalités du logiciel de gestion)

router.get("/users", isAdmin, userController.getAllUsers);
router.post("/users", isAdmin, hashPassword, userController.addNewUser);
router.delete("/users/:id", isAdmin, userController.deleteUser);

module.exports = router;
