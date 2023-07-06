const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Please login" });
  }

  jwt.verify(token, config.SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    req.user = user;
    next();
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, config.SECRET_TOKEN);
};

module.exports = {
  authenticateUser,
  generateAccessToken,
};
