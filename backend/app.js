const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const morgan = require("morgan");
const morganFormat = require("./utils/morgan");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const usersRouter = require("./routes/user.route");
const booksRouter = require("./routes/book.route");

const BASE_URL = "/api/v1";

// database config
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan(morganFormat));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// accepting uploaded photos
app.use(`${BASE_URL}/uploads`, express.static(path.join(__dirname, "upload")));

//routers
app.use(`${BASE_URL}/users`, usersRouter);
app.use(`${BASE_URL}/books`, booksRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
