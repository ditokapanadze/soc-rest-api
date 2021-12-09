const router = require("express").Router();
const Message = require("../models/Message");

// add

router.post("/", async (req, res) => {
  console.log(req.body);
  const newMessage = new Message(req.body);

  try {
    const saveMessage = await newMessage.save();
    res.status(200).json(saveMessage);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get

router.get("/:conversationId", async (req, res) => {
  console.log(req.params.conversationId);
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    console.log(messages);
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;