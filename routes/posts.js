const router = require("express").Router();
const Post = require("../models/Post");
// create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
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
  console.log(req.params.id);
  console.log(req.body.userId);
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post hase been liked");
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
router.get("/timeline", async (req, res) => {
  let PostArray = [];

  try {
    const currentUser = await User.findById(req.body.userId);

    const usePosts = await Post.find({ userId: currentUser._id });

    //  მეგობრების პოსტეს ვპოულობთ თაიმლაინისთვის
    const firendPosts = await Promise.all(
      currentUser.followings.mpa((friendId) => {
        Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...firendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
