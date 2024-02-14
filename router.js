const express = require("express");

const router = express.Router();

// const userController = require("./controllers/userController");
// router.get("/", (req, res) => {
//   res.send("welcome in my app");
// });
// router.get("/users", userController.getAllUsers);
// router.post("/login", userController.getUserByEmail);

const bookController = require("./controllers/bookController")

router.get("/books", bookController.getAllBooks);
router.get("/books/:id", bookController.getBookById);

router.post("/books", bookController.addNewBook);

router.put("/books/:id", bookController.updateBook);




module.exports = router;
