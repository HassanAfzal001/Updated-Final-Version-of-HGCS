var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var myAppointment = require("../models/myAppointmentModel");
mongoose.set('useFindAndModify', false);

// get all Appointments
router.get("/", (req, res, next) => {
  myAppointment.find({}).exec((error, records) => {
    if (error) throw error;
    res.json(records);
  });
});

// Get specific Appointments
router.get("/patient/:userId", (req, res, next) => {
  //   console.log(req.params.userId);
  myAppointment.find({ userId: req.params.userId }).exec((error, records) => {
    if (error) throw error;
    // console.log(records);
    res.json(records);
  });
});

// Get specific Appointments
router.get("/doctor/:userId", (req, res, next) => {
  //   console.log(req.params.userId);
  myAppointment.find({ doctorId: req.params.userId }).exec((error, records) => {
    if (error) throw error;
    // console.log(records);
    res.json(records);
  });
});

//add new Appointment
router.post("/addNewAppointment", function (req, res, next) {
  //   console.log(req.body.need);
  var newAppointment = new myAppointment({
    need: req.body.need,
    doctorId: req.body.doctorId,
    doctorName: req.body.doctorName,
    userId: req.body.userId,
    userName: req.body.userName,
    appointmentDate: new Date(req.body.appointmentDate),
  });

  res.json(newAppointment);
  newAppointment.save(function (err) {
    if (err) console.log("error", err);
    // saved!
  });
});

// delete an appointment
router.delete("/deleteAppointment", function (req, res, next) {
  console.log(req.body._id);
  myAppointment.findOneAndRemove({ _id: req.body._id }, function (err) {
    if (err) console.log("Error " + err);
    console.log("Removed");
  });
});

// update an appointment
router.put("/updateAppointment", function (req, res, next) {
//   console.log(req.body._id);
  var updatedEvent = new myAppointment({
    _id: req.body._id,
    need: req.body.need,
    doctorId: req.body.doctorId,
    doctorName: req.body.doctorName,
    userId: req.body.userId,
    userName: req.body.userName,
    appointmentDate: new Date(req.body.appointmentDate),
    status: req.body.status,
  });
  myAppointment.findOneAndUpdate(
    { _id: req.body._id },
    updatedEvent,
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;
