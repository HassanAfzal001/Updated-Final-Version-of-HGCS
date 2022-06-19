var mongoose = require("mongoose");

//Define a schema
var myAppointmentSchema = mongoose.Schema({
  need: {
    type: String,
  },
  doctorId: {
    type: String,
  },
  doctorName: {
    type: String,
  },
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  appointmentDate: {
    type: Date,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = myAppointment = mongoose.model(
  "myAppointment",
  myAppointmentSchema
);
