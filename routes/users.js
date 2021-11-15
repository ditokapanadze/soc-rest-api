const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const verifyUser = require("../verifyToken");

//update user

router.put("/", async (req, res) => {
  console.log(req.body);
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

// avatar upload, ცოტა ნელა მუშაობს ვერიფაიუზერის ფუნქციის გამო. შეილება ცოტა გამოსწორება.
// change user info
router.put("/changeInfo", verifyUser, async (req, res) => {
  const { userId } = req.config;
  console.log(req.body.editInfo);
  if (req.body.editInfo) {
    try {
      const newUser = await User.findByIdAndUpdate(
        userId,
        { desc: req.body.editInfo },
        { new: true }
      );
      console.log(newUser);
      res.status(200).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
  if (req.body.editAdress?.city) {
    try {
      const newUser = await User.findByIdAndUpdate(
        userId,
        { city: req.body.editAdress.city },
        { new: true }
      );
      res.status(200).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
  if (req.body.editAdress?.from) {
    try {
      const newUser = await User.findByIdAndUpdate(
        userId,
        { from: req.body.editAdress.from },
        { new: true }
      );
      res.status(200).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
});
//
router.post(
  "/changeavatar",
  verifyUser,
  upload.single("file"),
  async (req, res) => {
    // const { userId } = req.config;
    console.log(req.file.path);
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result.secure_url);
      const user = await User.findByIdAndUpdate(req.config.userId, {
        profilePicture: result.secure_url,
        cloudinary_id: result.public_id,
      });
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  }
);
//delete user

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
// აქ ბევრჯერ შემოდის მოთხოვნა, არასაჭირო დროს, გასარკვევია
router.get("/", async (req, res) => {
  // const userId = req.config.userId;
  // const username = req.config.username;
  console.log("Asdasd");
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    // პასვორდს და აფდეითის დროს ვაკლებთ იუზერს და დანარჩენ
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});
//  unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("You don't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});

// get friends

router.get("/friends/:userId", async (req, res) => {
  console.log(req.params.userId);
  try {
    const user = await User.findById(req.params.userId);

    // ფოლოუერებში მარტო აიდი გვაქ შენახული, ამიტო ჯერ უნდა მოვძებნოთ ყველა ფოლოუერის აიდი და მაგ აიდებით მოვძებნოთ მერე ეგ იუზერებო რო სახელი და პროფილი ფოტოები ამოვიღოთ
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];

    // friends.map((friend) => {
    //   consol.log(friend);
    //   const { _id, username, profilePicture } = friend;
    //   friendList.push({ _id, username, profilePicture });

    // });
    res.status(200).json(friends);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
