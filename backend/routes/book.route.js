const router = require("express").Router();
const BookController = require("../controllers/book.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/", authenticateUser, BookController.createBook);
router.put("/:bookId", authenticateUser, BookController.borrowBook);

module.exports = router;
