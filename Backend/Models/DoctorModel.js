const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First Name Is Required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name Is Required"],
    },
    phone: {
      type: String,
      required: [true, "Phone Number Is Required"],
    },
    email: {
      type: String,
      required: [true, "Email Is Required"],
    },
    address: {
      type: String,
      required: [true, "Address Is Required"],
    },
    website: {
      type: String,
    },
    specialization: {
      type: String,
      required: [true, "Specialization Is Required"],
    },
    experience: {
      type: String,
      required: [true, "Experience Is Required"],
    },
    feesPerCustomer: {
      type: Number,
      required: [true, "Fees Is Required"],
    },
    status: {
      type: String,
      default: "Pending",
    },
    timings: {
      type: Object,
      required: [true, "Work Timing Is Required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctors", DoctorSchema);
