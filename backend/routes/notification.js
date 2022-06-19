var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var myNotification = require("../models/myNotification.model");
mongoose.set("useFindAndModify", false);

// get all Notifications
router.get("/", (req, res, next) => {
  myNotification.find({}).exec((error, records) => {
    if (error) throw error;
    res.json(records);
  });
});

// Get specific Notifications
router.get("/patient/:userId", (req, res, next) => {
  //   console.log(req.params.userId);
  myNotification
    .find({ receiverId: req.params.userId })
    .exec((error, records) => {
      if (error) throw error;
      // console.log(records);
      res.json(records);
    });
});

// Get specific Notifications
router.get("/doctor/:userId", (req, res, next) => {
  //   console.log(req.params.userId);
  myNotification
    .find({ receiverId: req.params.userId })
    .exec((error, records) => {
      if (error) throw error;
      // console.log(records);
      res.json(records);
    });
});

//add new Appointment
router.post("/addNewNotification", function (req, res, next) {
  console.log(req.body.text);
  var newAppointment = new myNotification({
    senderId: req.body.senderId,
    senderName: req.body.senderName,
    receiverId: req.body.receiverna,
    receiverName: req.body.receiverName,
    receiverId: req.body.receiverId,
    text: req.body.text,
    appointmentId: req.body.appointmentId,
  });

  res.json(newAppointment);
  newAppointment.save(function (err) {
    if (err) console.log("error", err);
    // saved!
  });
});

// delete an appointment
router.delete("/deleteNotification", function (req, res, next) {
  console.log(req.body._id);
  myNotification.findOneAndRemove({ _id: req.body._id }, function (err) {
    if (err) console.log("Error " + err);
    console.log("Removed");
  });
});

module.exports = router;
