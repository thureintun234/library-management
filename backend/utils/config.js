const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

module.exports = { PORT, MONGO_URI, SECRET_TOKEN };
