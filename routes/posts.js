const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../verifyToken");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
// create a post

router.post("/", upload.single("postImage"), async (req, res) => {
  // console.log(req);

  const { userId } = req.body;
  const { desc } = req.body;

  console.log(userId);
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      const img = result.secure_url;
      const newPost = new Post({
        userId: userId,
        desc: desc,
        img: img,
      });
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } else {
      const newPost = new Post({
        userId: userId,
        desc: desc,
      });
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has beeen updated");
    } else {
      res.status(403).json("You can update only your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has beeen deleted");
    } else {
      res.status(403).json("You can delete only your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// like a post
router.put("/:id/like", async (req, res) => {
  console.log("test");
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      const newPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: { likes: req.body.userId },
        },
        { new: true }
      );

      console.log(newPost);
      res.status(200).json(newPost);
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post hase been unliked");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(403).json(err);
  }
});
// get timeline posts

// ეს შესამოწმებელია თუ მუშაობს
router.get("/timeline/:userId", async (req, res) => {
  let PostArray = [];
  console.log("Tessdsdsd");
  try {
    const currentUser = await User.findById(req.params.userId);

    const userPosts = await Post.find({ userId: currentUser._id }).sort({
      createdAt: -1,
    });
    // console.log(userPosts);
    //  მეგობრების პოსტეს ვპოულობთ თაიმლაინისთვის
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId }).sort({
          createdAt: -1,
        });
      })
    );
    console.log(userPosts.concat(...friendPosts));

    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user's all posts

// ეს შესამოწმებელია თუ მუშაობს
router.get("/profile/:username", async (req, res) => {
  console.log("aqaa");
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });

    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// კომენტარის დამატება
router.put("/comment/:id/:postId", async (req, res) => {
  console.log(req.body.info);
  const { commentText } = req.body.info;
  const { user_name } = req.body.info;
  const { user_profilePicture } = req.body.info;
  console.log(commentText);
  console.log(user_name);
  console.log(user_profilePicture);
  try {
    const newPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $push: {
          comments: {
            text: commentText,
            user_name,
            user_profilePicture,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(newPost);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
