const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let exp = path.extname(file.originalname);
    if (
      exp !== ".jpg" &&
      exp !== ".jpg" &&
      exp !== ".jpeg" &&
      exp !== ".png" &&
      exp !== ".PNG"
    ) {
      cb(new Error("file type is not suporter"), false);
      return;
    }
    cb(null, true);
  },
});
