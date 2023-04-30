const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }, { username: 1, shopname: 1, email: 1 });
  res.json(users);
};

exports.getActiveUsers

