const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const convRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const cors = require("cors");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOVerride = require("method-override");
const verifyUser = require("./verifyToken");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

dotenv.config();

const conn = mongoose
  .connect(process.env.MONGO_URl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

// ფაილების ასათვირთადა არის ეს ფუნქციები საჭირო

// Storage Engine

// Storage Engine

// @route GET /
// loads from
// @route post /upload
// uploads file to db

app.use(express.json());
app.use(methodOVerride("_method"));
// app.use(bodyParser.jsdson());
app.use("/images", express.static(path.join(__dirname, "public/images")));
//midlleware

app.use(cors());

app.use(helmet());
app.use(morgan("common"));

// აპლიკაციაში ინახავს ეს სურათებს, მერე უნდა შევცვალო, დროებითაა
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   console.log("Test");
//   try {
//     res.status(200).json("File uploaded");
//   } catch (err) {
//     console.log(err);
//   }
// });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", convRoute);
app.use("/api/messages", messageRoute);

app.listen(5000, () => {
  console.log("Server is running");
});
