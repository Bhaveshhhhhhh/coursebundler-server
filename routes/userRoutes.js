import express from "express";
import {
  addToPlaylist,
  changePassword,
  delteMyProfile,
  delteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateUserRole,
  updateprofilepicture,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(singleUpload, register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/me").delete(isAuthenticated, getMyProfile, delteMyProfile);

router.route("/changepassword").put(isAuthenticated, changePassword);

router.route("/updateprofile").put(isAuthenticated, updateProfile);

router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateprofilepicture);

router.route("/forgetpassword").post(forgetPassword);

router.route("/resetpassword/:token").put(resetPassword);

router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, delteUser);

export default router;
