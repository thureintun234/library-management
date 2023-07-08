const router = require("express").Router();
const BookController = require("../controllers/book.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/upload.middleware");

router.post(
  "/",
  authenticateUser,
  upload.single("fileUpload"),
  BookController.createBook
);
router.put("/:bookId", authenticateUser, BookController.borrowBook);
router.get("/", authenticateUser, BookController.getBooks);
router.delete("/:bookId", authenticateUser, BookController.deleteBook);

module.exports = router;
