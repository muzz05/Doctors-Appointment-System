const User = require("../Models/UserModel");
const {
  hashPassword,
  verifyPassword,
} = require("../Utilities/PasswordHashing");
const jwt = require("jsonwebtoken");
const Doctor = require("../Models/DoctorModel");
const Appoinment = require("../Models/AppoinmentModel");
const moment = require("moment");

const LoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.send({ message: "This User Does not Exist", success: false });
    }
    const DoesPasswordMatch = verifyPassword(password, user.password);
    if (!DoesPasswordMatch) {
      return res.send({ message: "Incorrect Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.send({
      message: "User Logged In Successfully",
      success: true,
      token,
    });
  } catch (ex) {
    next(ex);
  }
};

const RegisterController = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ message: "User Already Exists", success: false });
    }
    let user = new User({
      name,
      email,
      password: hashPassword(password),
    });
    await user.save();
    res.status(201).send({
      message: "User Has Been Registered Successfully",
      success: true,
      user,
    });
  } catch (ex) {
    next(ex);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    delete user.password;
    if (!user) {
      return res.send({ success: false, message: "This User Does not Exists" });
    }
    res.send({ success: true, data: user });
  } catch (ex) {
    next(ex);
  }
};

const applyDoctorController = async (req, res, next) => {
  try {
    const newDoctor = new Doctor({ ...req.body, status: "Pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "Apply-Doctor-Request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await User.findByIdAndUpdate(adminUser._id, { notification });
    res.send({ success: true, message: "Doctor Account Applied Successfully" });
  } catch (ex) {
    next(ex);
  }
};

const allNotificationController = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = seenNotification;
    const updatedUser = await user.save();
    delete updatedUser.password;
    res.send({
      success: true,
      message: "All Notifications are Marked as Read",
      data: updatedUser,
    });
  } catch (ex) {
    next(ex);
  }
};

const DeleteAllNotificationController = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotification = [];
    const updatedUser = await user.save();
    delete updatedUser.password;
    res.send({
      success: true,
      message: "All Read Notifications Are Deleted",
      data: updatedUser,
    });
  } catch (ex) {
    next(ex);
  }
};

const getAllApprovedDoctorsController = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ status: "Approved" });
    res.send({ success: true, doctors, message: "Doctors List" });
  } catch (ex) {
    next(ex);
  }
};

const BookAppoinmentController = async (req, res, next) => {
  try {
    req.body.status = "Pending";
    req.body.date = moment(req.body.date, "DD-MM-YY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const appoinment = new Appoinment(req.body);
    await appoinment.save();
    const user = await User.findOne({ _id: appoinment.doctorInfo.userId });
    const notification = user.notification;
    notification.push({
      type: "New-Appoinment-Request",
      message: `A New Appoinment Request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appoinments",
    });
    user.notification = notification;
    await user.save();
    res.send({ success: true, message: "Appoinment Booked Successfully" });
  } catch (ex) {
    next(ex);
  }
};

const BookingAvailabilityController = async (req, res, next) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const appoinments = await Appoinment.find({
      doctorId: req.body.doctorId,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appoinments.length > 0) {
      return res.send({
        success: false,
        message: "Appoinments Not Available At This Time",
      });
    }
    res.send({ success: true, message: "Appointment is Available" });
  } catch (ex) {
    next(ex);
  }
};

const userAppoinmentController = async (req, res, next) => {
  try {
    const appoinments = await Appoinment.find({ userId: req.body.userId });
    res.send({
      success: true,
      message: "Appoinments Fetched Successfully",
      appoinments,
    });
  } catch (ex) {
    next();
  }
};

module.exports = {
  LoginController,
  RegisterController,
  getUserController,
  applyDoctorController,
  allNotificationController,
  DeleteAllNotificationController,
  getAllApprovedDoctorsController,
  BookAppoinmentController,
  BookingAvailabilityController,
  userAppoinmentController,
};
