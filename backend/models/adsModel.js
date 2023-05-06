const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
  title: {
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  age: {
    type: String,
    enum:["(4-12)","(12-53)"],
    required: true,
  },
  files: [
    Object
  ],
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ["active", "inactive", "pending", "rejected"],
    default: "pending"
  },
  userId_req: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  timeReq: {
    type: Date,
    default: Date.now,
  },

})

