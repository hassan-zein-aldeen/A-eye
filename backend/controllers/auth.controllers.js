const User = require("../models/userModel")
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    if (!user) return res.status(404).json({ message: "Invalid Credentials" });
    const isMatched = user.matchPassword(password);

    if (!isMatched) return res.status(404).json({ message: "Invalid Credentials" });
    const token = jwt.sign({ id: user._id, shopname: user.shopname, username: user.username, role: user.role }, process.env.SECRET_KEY);
    const role = await User.findOne({username}).select("role");
    res.json({ token, role })
  } catch (e) {
    console.error(e);
    res.status(425).json({ message: "Failed from login" });
  }

}

exports.createUser = async (req, res) => {
  const { role, shopname, username, password, email, address } = req.body;
  try {
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

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "An error occurred while creating the user. Please try again later." });
  }


}