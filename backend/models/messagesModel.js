const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  txtContent:{
    type: String,
    required: true
  },
  timeSent:{
    type: Date,
    default: Date.now
  }
})