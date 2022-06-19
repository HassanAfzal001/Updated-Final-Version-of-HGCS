const express = require("express");
//const app = express();
const {
  createDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorDetails,
  createDoctorReview,
  getDoctorReviews,
  deleteReview,
  getAdminDoctors,
} = require("../controllers/doctorController");
//app.use(addDoctor,addDoctorReview);
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/doctors").get(getAllDoctors);

router
  .route("/admin/doctors")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminDoctors); 

router.route("/admin/doctor/add").post(isAuthenticatedUser, authorizeRoles('admin'), createDoctor);

router
  .route("/admin/doctor/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateDoctor)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteDoctor);

router.route("/doctor/:id").get(getDoctorDetails);


router.route("/review").put(isAuthenticatedUser, createDoctorReview);
;

router
  .route("/reviews")
  .get(getDoctorReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
