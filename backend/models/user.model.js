const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required."],
      min: 2,
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required."],
      min: 2,
    },
    email: {
      type: String,
      required: [true, "Enter valid email."],
      unique: [true, "Email already registered"],
    },
    password: { type: String, required: [true, "Enter Password."], min: 2 },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = new mongoose.model("User", UserSchema);
module.exports = User;
