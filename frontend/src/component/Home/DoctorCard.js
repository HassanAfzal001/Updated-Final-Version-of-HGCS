import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const DoctorCard = ({ doctor }) => {
  console.log(doctor)
  const options = {
    value: doctor.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="doctorCard" to={`/doctor/${doctor._id}`}>
      <img src={doctor.images} alt={doctor.name} />
      <p>{doctor.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="doctorCardSpan"> ({doctor.numOfReviews} Reviews)</span>
      </div>
      <span>{`Rs ${doctor.fee}`}</span>
    </Link>
  );
};

export default DoctorCard;
