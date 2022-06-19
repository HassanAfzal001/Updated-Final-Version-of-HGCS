import React, { Fragment, useEffect } from "react";
import "./appointmentDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
//import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getAppointmentDetails, clearErrors } from "../../actions/appointmentAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const AppointmentDetails = ({ match }) => {
  const { appointment, error, loading } = useSelector((state) => state.appointmentDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAppointmentDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Appointment Details" />
          <div className="appointmentDetailsPage">
            <div className="appointmentDetailsContainer">
              <Typography component="h1">
                Appointment #{appointment && appointment._id}
              </Typography>
              <div className="appointmentDetailsContainerBox">
              
              </div>
              <Typography>Payment</Typography>
              <div className="appointmentDetailsContainerBox">
                <div>
                  <p
                    className={
                      appointment?.paymentInfo &&
                      appointment?.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {appointment?.paymentInfo &&
                    appointment?.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>  
                  <span>{appointment?.totalFee && appointment?.totalFee}</span>
                </div>
              </div>

              <Typography>Appointment Status</Typography>
              <div className="appointmentDetailsContainerBox">
                <div>
                  <p
                    className={
                      appointment?.appointmentStatus && appointment?.appointmentStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {appointment?.appointmentStatus && appointment?.appointmentStatus}
                  </p>
                </div>
              </div>
            </div>

           
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AppointmentDetails;
