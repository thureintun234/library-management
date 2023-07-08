const Book = require("../models/book.model");
const User = require("../models/user.model");

const createBook = async (req, res) => {
  try {
    const { title, author, category, description } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not exit" });
    }

    if (user.role !== "Librarian") {
      return res
        .status(400)
        .json({ message: "Only librarian can create the books!" });
    }

    const book = await Book({
      title,
      author,
      category,
      description,
      createdBy: req.user.id,
    });

    if (req.file) {
      const { filename } = req.file;
      book.photo = filename;
    }

    const savedBook = await book.save();
    res.status(201).json({ book: savedBook, message: "Book created" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    if (!book.available) {
      return res
        .status(409)
        .json({ message: "This book is currently borrowed by another user" });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, {
      available: false,
      borrowedBy: req.user.id,
    });

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.bookBorrowed.length >= 5) {
      return res
        .status(403)
        .send("You have reached the maximum limit of borrowed books");
    }

    user.bookBorrowed.push(bookId);
    await user.save();

    res.status(200).json({
      message: "Borrowing book successfulled",
      user,
      book: updatedBook,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = { createBook, borrowBook };
