var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var myDoc = require("../models/doctorModel");

// get all doctors
router.get("/", (req, res, next)=> {
//   console.log("Hello");
  myDoc.find({}).exec((error, records) => {
    if (error) throw error;
    res.json(records);
  });
});

module.exports = router;
