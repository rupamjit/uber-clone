import mongoose from "mongoose";

const blackListTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

const BlackListToken = mongoose.model("BlackListToken", blackListTokenSchema);
export default BlackListToken;