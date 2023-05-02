const Message = require("../models/messagesModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.sendMessage = async (req, res) => {
  const { rec, sender, title, txtContent } = req.body;

  try {
    const users = await User.find({}, { '_id': 1 });
    const userIds = users.map(user => user._id.toString());
    const isfound = rec.every(element => userIds.includes(element));

    function hasDuplicates(array) {
      return new Set(array).size !== array.length;
    }

    if (isfound && !hasDuplicates(rec) && !rec.includes(sender)) {
      const message = new Message();
      message.receiver = rec;
      message.sender = sender;
      message.title = title;
      message.txtContent = txtContent;
      await message.save();
      res.json(message);
    } else {
      res.json({ message: "Cannot send Message! Check Users" });
    }
  } catch (error) {
    res.json({ message: "Error while sending message Status", error });
  }
}


exports.getMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const messages = await Message.find({
      receiver: { $in: [new mongoose.Types.ObjectId(id)] }
    })
      .populate('sender', 'username')
      .populate({ path: 'receiver', select: 'username', match: { _id: new mongoose.Types.ObjectId(id) } })
      .select('txtContent')
      .exec();
    res.status(200).json(messages);
  } catch (e) {
    console.error(`Error while getting messages for receiver with ID ${id}: `, e)
    res.json({ message: "Error while getting messages" });
  }
}

exports.showSentMessages = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid sender ID' });
    }

    const messages = await Message.find({ sender: id })
      .populate('receiver', 'username')
      .select('title txtContent timeSent')
      .exec();
    res.status(200).json(messages);
  } catch (e) {
    console.error(`Error while getting sent messages by sender with ID ${id}: `, e)
    res.json({ message: "Error while getting sent messages" });
  }
}