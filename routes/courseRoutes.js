import express from "express";
import {
  addLecture,
  createCourses,
  deleteCourses,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import {
  authorizeAdmin,
  isAuthenticated,
  authorizeSubscriber,
} from "../middlewares/auth.js";

const router = express.Router();

//get all courses without lectures
router.route("/courses").get(getAllCourses);

//create new course - only admin
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourses);

router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscriber, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourses);

router.route("/lecture").post(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
