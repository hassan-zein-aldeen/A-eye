const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }, { username: 1, shopname: 1, email: 1 });
  res.json(users);
};

exports.getActiveUsers = async (req, res) => {
  const active_users = await User.find({ role: "user", status: "active" }, { username: 1, shopname: 1, email: 1 });
  res.json(active_users);
}

exports.getInactiveUsers = async (req, res) => {
  const inactive_users = await User.find({ role: "user", status: "inactive" }, { username: 1, shopname: 1, email: 1 })
  res.json(inactive_users);
}

exports.updateUserStatus = async (req, res) => {

}

