const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const rootDir = path.resolve("./");
    const folderPath = rootDir + "/upload";
    if (fs.existsSync(folderPath)) {
    } else {
      console.log("creating sign folder dir ", folderPath);
      fs.mkdirSync(folderPath);
    }
    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const fileId = uuid.v4();
    const fileExtension = path.extname(file.originalname);
    const fileName = fileId + fileExtension;
    cb(null, fileName);
  },
});

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 5242880, // max size is 5 MB for each image
    files: 30, // accept 10 files maximum
  },
});
