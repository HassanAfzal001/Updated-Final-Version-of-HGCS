const express = require("express");
const {
  newAppointment,
  getSingleAppointment,
  myAppointments,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/appointments/new").post(isAuthenticatedUser, newAppointment);

router.route("/appointment/:id").get(isAuthenticatedUser, getSingleAppointment);

router.route("/appointment/me").get(isAuthenticatedUser, myAppointments);

router
  .route("/admin/appointments")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllAppointments);

router
  .route("/admin/appointment/:id")
 .put(isAuthenticatedUser, authorizeRoles("admin"), updateAppointment)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAppointment);

module.exports = router;
