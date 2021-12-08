const router = require("express").Router();
const Conversation = require("../models/Conversation");

// new conversation

router.post("/", async (req, res) => {
  console.log("test");
  const newConverstaion = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConverstaion.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(400).json(err);
  }
});
// get conversatoin of a user
module.exports = router;

router.get("/:userId", async (req, res) => {
  console.log(req.params.userId);
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(400).json(err);
  }
});
