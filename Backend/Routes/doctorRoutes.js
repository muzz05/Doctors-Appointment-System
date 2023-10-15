const { Router } = require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  GetDoctorDataController,
  UpdateDoctorDataController,
  GetSingleDoctorDataController,
  GetDoctorAppoinmentsController,
  UpdateAppoinmentStatusController,
} = require("../Controllers/doctorController");
const router = Router();

// Route 1: This is to get The Doctors Info / METHOD: POST
router.post("/get-doctor-info", authMiddleware, GetDoctorDataController);

// Route 2: This is to Update the Doctor Info / METHOD: POST
router.post("/update-doctor-info", authMiddleware, UpdateDoctorDataController);

// Route 3: This is Get Single Doctor Info/ METHOD: POST
router.post(
  "/get-single-doc-info",
  authMiddleware,
  GetSingleDoctorDataController
);

// Route 4: This is to Get all the Doctor Appionments / METHOD: POST
router.post(
  "/doctor-appoinments",
  authMiddleware,
  GetDoctorAppoinmentsController
);

// Route 5: This is to Update the Status of the Appoinment / METHOD: POST
router.post(
  "/update-appoinment-status",
  authMiddleware,
  UpdateAppoinmentStatusController
);

module.exports = router;
