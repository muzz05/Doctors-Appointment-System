const { Router } = require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllDoctorsController,
  ChangeAccountStatusController,
  DeleteUserController,
} = require("../Controllers/adminController");
const router = Router();

// Route 1: This is to get all the users / METHOD: GET
router.get("/get-all-users", authMiddleware, getAllUsersController);

// Route 2: This is to get all the Doctors / METHOD: GET
router.get("/get-all-doctors", authMiddleware, getAllDoctorsController);

// Route 3: This is to Change the Account status / METHOD: POST
router.post(
  "/change-account-status",
  authMiddleware,
  ChangeAccountStatusController
);

// Route 4: This is to delete a User
router.delete("/delete-user/:id", authMiddleware, DeleteUserController);

module.exports = router;
