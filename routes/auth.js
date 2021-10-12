const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register

router.post("/register", async (req, res) => {
  console.log("test");
  try {
    const salt = await bcrypt.genSalt(10);
    const hasedPasswrod = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hasedPasswrod,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login

router.post("/login", async (req, res) => {
  console.log(req.body.password);
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(404).json("user not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(validPassword);
    !validPassword && res.status(400).json("password is incorrect");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
