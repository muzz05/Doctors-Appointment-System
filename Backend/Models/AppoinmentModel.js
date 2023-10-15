const mongoose = require("mongoose");

const AppoinmentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "UserId is Required"],
    },
    doctorId: {
      type: String,
      required: [true, "DoctorId Is Required"],
    },
    doctorInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appoinments", AppoinmentSchema);
