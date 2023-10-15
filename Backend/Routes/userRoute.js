const { Router } = require("express");
const {
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
} = require("../Controllers/userController");
const authMiddleware = require("../Middlewares/authMiddleware");
const router = Router();

// Route 1: This is to Login the user / METHOD: POST
router.post("/login", LoginController);

// Route 2: This is to Register the user / METHOD: POST
router.post("/register", RegisterController);

// Route 3: This is to Get the user Data / METHOD: POST
router.post("/get-user", authMiddleware, getUserController);

// Route 4: This is to Apply for Doctor / METHOD: POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Route 5: This is to Get All the Notifications / METHOD: POST
router.post(
  "/get-all-notifications",
  authMiddleware,
  allNotificationController
);

// Route 6: This is to Delete all Read Notifications / METHOD: POST
router.post(
  "/delete-all-notifications",
  authMiddleware,
  DeleteAllNotificationController
);

// Route 7: This is to get all the Doctors / METHOD: GET
router.get(
  "/get-all-approved-doctors",
  authMiddleware,
  getAllApprovedDoctorsController
);

// Route 8: This is to Book The Appoinment / METHOD: POST
router.post("/book-appoinment", authMiddleware, BookAppoinmentController);

// Route 9: This is to Check the Booking Availability / METHOD: POST
router.post(
  "/booking-availability",
  authMiddleware,
  BookingAvailabilityController
);

// Route 10: This is to Get All the User Appoinments / METHOD: POST
router.post("/user-appoinments", authMiddleware, userAppoinmentController);

module.exports = router;
