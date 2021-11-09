const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register

router.post("/register", async (req, res) => {
  const checkUserName = await User.findOne({ username: req.body.username });

  if (checkUserName) {
    return res.status(400).json({ message: "Username is taken" });
  }
  const checkEmail = await User.findOne({ email: req.body.email });

  if (checkEmail) {
    return res
      .status(400)
      .json({ message: "Email already in use, did you forget the password?" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hasedPasswrod = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hasedPasswrod,
    });
    const user = await newUser.save();

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ res: user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
// აქ რაღაცა ურევს, გასაწორებელია
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { online: true } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    } else if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({ message: "wrong password" });
      }
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

// logout
router.put("/logout/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      online: false,
    });
    res.status(200).json({ message: " logout succesfull" });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
