const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const playerSchema = new mongoose.Schema({
  playername: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

playerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

playerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
