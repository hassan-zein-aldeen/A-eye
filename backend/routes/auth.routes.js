const User = require("../models/userModel")

const login = async () => {
  
}

const createUser = async (req, res) => {
  const { role, shopname, username, password, email, address } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(409).json({ message: "username already exists" })

  const user = new User();
  user.role = role;
  user.shopname = shopname;
  user.username = username;
  user.password = password;
  user.email = email;
  user.address = address;

  await user.save();
  const { password: hashedPassword, ...newUser } = user.toJSON();
  res.status(201).json(newUser);
}