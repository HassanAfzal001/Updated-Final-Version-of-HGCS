import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./appointmentSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const AppointmentSuccess = () => {
  return (
    <div className="appointmentSuccess">
      <CheckCircleIcon />

      <Typography>Your Appointment has been Placed successfully </Typography>
      <Link to="/appointments">View Appointments</Link>
    </div>
  );
};

export default AppointmentSuccess;
