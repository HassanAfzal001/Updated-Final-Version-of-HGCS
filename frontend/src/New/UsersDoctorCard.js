import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const UsersDoctorCard = ({ doctor }) => {
  console.log(doctor);
  const options = {
    value: doctor.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="doctorCard">
      <img src={doctor.avatar.url} alt={doctor.name} />
      <p>{doctor.name}</p>
      {/* <div>
        <Rating {...options} />{" "}
        <span className="doctorCardSpan"> ({doctor.numOfReviews} Reviews)</span>
      </div> */}
      {/* <span>{`Rs ${doctor.fee}`}</span> */}
    </div>
  );
};

export default UsersDoctorCard;
