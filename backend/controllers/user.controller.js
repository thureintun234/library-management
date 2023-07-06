const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateAccessToken } = require("../middlewares/auth.middleware");

const createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exit!" });
    }

    const ROUNDED_SALT = 12;
    const hashedPassword = await bcrypt.hash(password, ROUNDED_SALT);

    const newUser = await User({
      email,
      password: hashedPassword,
      role: role ? role : "User",
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exit" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = generateAccessToken(userForToken);
    await user.save();

    res.status(200).json({ token, user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not exit" });
    }

    if (user.role !== "Librarian") {
      return res
        .status(400)
        .json({ message: "Only librarian can see user lists!" });
    }

    const users = await User.find().populate("bookBorrowed").exec();

    const userBookDetails = users.map((user) => ({
      email: user.email,
      borrowedBooks: user.bookBorrowed.map((book) => ({
        title: book.title,
        author: book.author,
        category: book.category,
      })),
    }));

    res.status(200).json({ userBookDetails });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = { createUser, login, getUsers };
