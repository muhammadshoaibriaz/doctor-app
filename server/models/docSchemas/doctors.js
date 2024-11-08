const mongoose = require("mongoose");
const docSignUp = new mongoose.Schema({
  phone_number: { type: String },
  bio: { type: String },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  gender: { type: String },
  dateOfBirth: { type: String },
  workingSince: { type: String },
  image: { type: String },
  specialist: { type: String },
  documents: { type: Array },
  videoCallFee: { type: String },
  textFee: { type: String },
  visitFee: { type: String },
  phoneCallFee: { type: String },
  videoConsultationFee: { type: String },
  video_consultation: { type: String },
  phone_call: { type: String },
  text_conversation: { type: String },
  actual_visit: { type: String },
  video_call: { type: String },
  availability: { type: Array },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  rating: { type: Number },
  timing: { type: String },
  ending: { type: String },
  joining_date: { type: String },
  city: { type: String },
  balance: { type: Number, default: 0 },
  degree: { type: String },
  hospitals: { type: Array },
  online: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  services: [String],
});

const DocAccounts = mongoose.model("DocAccounts", docSignUp);
module.exports = DocAccounts;
