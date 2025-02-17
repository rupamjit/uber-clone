import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickUp: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp:{
    type:String,
    select:false,
    required:true
  }
});


const Ride = mongoose.model('Ride',rideSchema)

export default Ride