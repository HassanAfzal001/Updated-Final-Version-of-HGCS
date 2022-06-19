import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getAppointmentDetails,
  clearErrors,
  updateAppointment,
} from "../../actions/appointmentAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";
import "./processAppointment.css";

const ProcessAppointment = ({ history, match }) => {
  const { appointment, error, loading } = useSelector((state) => state.appointmentDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.appointment);

  const updateAppointmentSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateAppointment(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Appointment Updated Successfully");
      dispatch({ type: UPDATE_APPOINTMENT_RESET });
    }

    dispatch(getAppointmentDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Appointment" />
      <div className="dashboard">
        <SideBar />
        <div className="newDoctorContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmAppointmentPage"
              style={{
                display: appointment.appointmentStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmbookingArea">
                  <Typography>Booking Info</Typography>
                  <div className="appointmentDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{appointment.user && appointment.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {appointment.bookingInfo && appointment.bookingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {appointment.bookingInfo &&
                          `${appointment.bookingInfo.address}, ${appointment.bookingInfo.city}, ${appointment.bookingInfo.state}, ${appointment.bookingInfo.pinCode}, ${appointment.bookingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="appointmentDetailsContainerBox">
                    <div>
                      <p
                        className={
                          appointment.paymentInfo &&
                          appointment.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {appointment.paymentInfo &&
                        appointment.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{appointment.totalFee && appointment.totalFee}</span>
                    </div>
                  </div>

                  <Typography>Appointment Status</Typography>
                  <div className="appointmentDetailsContainerBox">
                    <div>
                      <p
                        className={
                          appointment.appointmentStatus && appointment.appointmentStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {appointment.appointmentStatus && appointment.appointmentStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmSelectionItems">
                  <Typography>Your Selection Items:</Typography>
                  <div className="confirmSelectionItemsContainer">
                    {appointment.appointmentItems &&
                      appointment.appointmentItems.map((item) => (
                        <div key={item.doctor}>
                          <img src={item.image} alt="Doctor" />
                          <Link to={`/doctor/${item.doctor}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X Rs  {item.fee} ={" "}
                            <b>Rs  {item.fee * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: appointment.appointmentStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateAppointmentForm"
                  onSubmit={updateAppointmentSubmitHandler}
                >
                  <h1>Process Appointment</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {appointment.appointmentStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {appointment.appointmentStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createDoctorBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessAppointment;
