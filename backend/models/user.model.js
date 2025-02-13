import { jwt } from "jsonwebtoken";
import mongoose from "mongoose";
impirt;
const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be greater than 3 characters"],
    },
    lastName: {
      type: String,
      inlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.getAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 1);
};

const User = mongoose.model("User", userSchema);
export default User;
