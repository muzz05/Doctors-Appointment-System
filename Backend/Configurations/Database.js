const mongoose = require("mongoose");

connectMongoDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Doctor-Appointment")
    .then(() => {
      console.log("Connected to Database...");
    })
    .catch(() => {
      console.log("Some Error occured in the Database...");
    });
};

module.exports = connectMongoDB;
