import React,{Fragment} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const DoctorCard = ({ doctor, userDoctor }) => {
  const {user} = useSelector((state) => state.user);
  console.log(doctor)
  console.log(userDoctor)
  console.log(user)
  const options = {
    value: doctor.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return ( 
    <Fragment>{user?.role !== "Doctor" ? (
    <Link className="doctorCard" to={`/doctor/${doctor._id}`}>
      <img src={doctor.images} alt={doctor.name} />
      <p>{doctor.name}</p>
      {/* <div>
        <Rating {...options} />{" "}
        <span className="doctorCardSpan"> ({doctor.numOfReviews} Reviews)</span>
      </div> */}
      <span>{`Rs ${doctor.fee}`}</span>
    </Link>)
    :
    (<Link className="doctorCard" >
      <img src={doctor.images} alt={doctor.name} />
      <p>{doctor.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="doctorCardSpan"> ({doctor.numOfReviews} Reviews)</span>
      </div>
      <span>{`Rs ${doctor.fee}`}</span>
    </Link>
    )}</Fragment>
  );
};

export default DoctorCard;
