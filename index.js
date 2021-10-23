const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
const multer = require("multer");

const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")));
//midlleware
app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// აპლიკაციაში ინახავს ეს სურათებს, მერე უნდა შევცვალო, დროებითაა
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log("Test");
  try {
    res.status(200).json("File uploaded");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () => {
  console.log("Server is running");
});
