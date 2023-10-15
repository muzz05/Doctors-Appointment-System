const User = require("../Models/UserModel");
const Doctor = require("../Models/DoctorModel");
const Appoinments = require("../Models/AppoinmentModel");

const GetDoctorDataController = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.send({ success: true, doctor });
  } catch (ex) {
    next(ex);
  }
};

const UpdateDoctorDataController = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.send({
      success: true,
      doctor,
      message: "Doctor Profile updated Successfully",
    });
  } catch (ex) {
    next(ex);
  }
};

const GetSingleDoctorDataController = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    res.send({ success: true, doctor });
  } catch (ex) {
    next(ex);
  }
};

const GetDoctorAppoinmentsController = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    const appoinments = await Appoinments.find({ doctorId: doctor._id });
    res.send({ success: true, appoinments });
  } catch (ex) {
    next(ex);
  }
};

const UpdateAppoinmentStatusController = async (req, res, next) => {
  try {
    const { appoinmentId, status } = req.body;
    const appoinment = await Appoinments.findByIdAndUpdate(appoinmentId, {
      status,
    });
    const user = await User.findOne({ _id: appoinment.userId });
    const notification = user.notification;
    notification.push({
      type: "Appointment-Status-Update",
      message: `Your Appoinment Status Has Been Updated (${status}) `,
      onClickPath: "/appoinments",
    });
    user.notification = notification;
    await user.save();
    res.send({ success: true, message: "Appoinment Status Has Been Updated" });
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  GetDoctorDataController,
  UpdateDoctorDataController,
  GetSingleDoctorDataController,
  GetDoctorAppoinmentsController,
  UpdateAppoinmentStatusController,
};
