const Message = require("../models/messagesModel");
const User = require("../models/userModel");

exports.sendMessage = async (req, res) => {
  const { rec, sender, title, txtContent } = req.body;

  try {
    const users = await User.find({}, { '_id': 1 });
    const userIds = users.map(user => user._id.toString());
    const isfound = rec.every(element => userIds.includes(element));

    function hasDuplicates(array) {
      return new Set(array).size !== array.length;
    }

    if (isfound && !hasDuplicates(rec)) {
      const message = new Message();
      message.receiver = rec;
      message.sender = sender;
      message.title = title;
      message.txtContent = txtContent;
      await message.save();
      res.json(message);
    } else {
      res.json({ message: "Not allowed to send message for duplicated user or user not found" });
    }
  } catch (error) {
    res.json({ message: "Error while sending message Status", error });
  }
}