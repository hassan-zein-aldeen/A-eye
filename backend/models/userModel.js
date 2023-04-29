const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  shopname: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  }

})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next()
})

userSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}
const User = mongoose.model("User", userSchema);
module.exports = User;
