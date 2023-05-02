const Message = require("../models/messagesModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.sendMessage = async (req, res) => {
  const { rec, sender, title, txtContent } = req.body;

  try {
    const users = await User.find({}, { '_id': 1 });
    console.log(users);
    const userIds = users.map(user => user._id.toString());
    console.log(userIds);
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
    console.log(new mongoose.Types.ObjectId(id));
    console.log(`Found messages for receiver with ID ${id}: `, messages);
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

    console.log(`Found sent messages by sender with ID ${id}: `, messages);
    res.status(200).json(messages);
  } catch (e) {
    console.error(`Error while getting sent messages by sender with ID ${id}: `, e)
    res.json({ message: "Error while getting sent messages" });
  }
}