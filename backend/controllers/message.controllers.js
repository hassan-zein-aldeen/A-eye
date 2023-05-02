const Message = require("../models/messagesModel");
const User = require("../models/userModel");

exports.sendMessage = async (req, res) => {
  const { rec, sender, title, txtContent } = req.body;

  try {
    const users = await User.find({}, { '_id': 1 });

    const message = new Message();
    message.receiver = rec;
    message.sender = sender;
    message.title = title;
    message.txtContent = txtContent;
    await message.save();

  } catch (error) {
    res.json({ message: "Error while sending message", error });
  }
}