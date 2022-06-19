var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var myUser = require("../models/userModel");

// return only those users that has role of Doctor
// return only doctors from users
router.get("/doctors", (req, res, next) => {
  // console.log(req.query.name);
  myUser.find({ role: "Doctor" }).exec((error, records) => {
    if (error) throw error;
    // console.log(records);
    res.json(records);
  });
});

// search specific User
router.get("/:userId", (req, res, next) => {
  // console.log(req.params.userId);
  myUser.findById(req.params.userId).exec((error, records) => {
    if (error) throw error;
    res.json(records);
  });
});

module.exports = router;
