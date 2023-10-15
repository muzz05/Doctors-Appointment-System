const Users = require("../Models/UserModel");
const Doctors = require("../Models/DoctorModel");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await Users.find().select("email name isDoctor _id");
    res.send({ success: true, users, message: "Users List" });
  } catch (ex) {
    next(ex);
  }
};

const getAllDoctorsController = async (req, res, next) => {
  try {
    const doctors = await Doctors.find();
    res.send({ success: true, doctors, message: "Doctors List" });
  } catch (ex) {
    next(ex);
  }
};

const ChangeAccountStatusController = async (req, res, next) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctors.findByIdAndUpdate(doctorId, { status });
    const user = await Users.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "Doctor-Account-Request-Update",
      message: `Your Account Request Has ${status}`,
      onClickPath: "/notification",
    });
    status === "Approved" ? (user.isDoctor = true) : (user.isDoctor = false);
    user.notification = notification;
    await user.save();
    res.send({
      success: true,
      message: "Account has been updated Successfully",
      doctor,
    });
  } catch (ex) {
    next(ex);
  }
};

const DeleteUserController = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    res.send({ success: true, message: "User Have Been Deleted Successfully" });
  } catch (ex) {
    next(ex);
  }
};
module.exports = {
  getAllUsersController,
  getAllDoctorsController,
  ChangeAccountStatusController,
  DeleteUserController,
};
