const express = require("express");
//const app = express();
const {
  createPatient,
  getAllPatient,
  updatePatient,
  deletePatient,
  getPatientDetails,
  getAdminPatients,
} = require("../controllers/patientController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/patients").get(getAllPatient);

router
  .route("/admin/patients")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminPatients); 

router.route("/admin/patient/add").post(isAuthenticatedUser, authorizeRoles('admin'), createPatient);

router
  .route("/admin/patient/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePatient)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePatient);

router.route("/patient/:id").get(getPatientDetails);


module.exports = router;
