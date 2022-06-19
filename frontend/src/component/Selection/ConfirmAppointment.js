import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmAppointment.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmAppointment = ({ history }) => {
  const { bookingInfo, selectionItems } = useSelector((state) => state.selection);
  const { user } = useSelector((state) => state.user);

  const subtotal = selectionItems.reduce(
    (acc, item) => acc + (item.quantity * item.fee),
    0
  );

  //subtotal > 1000 ? 0 : into below statement
  const bookingCharges =  200;

  const tax = bookingCharges * 0.11;

  const totalFee =  tax + bookingCharges;

  const address = `${bookingInfo.address}, ${bookingInfo.city}, ${bookingInfo.state}, ${bookingInfo.pinCode}, ${bookingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      bookingCharges,
      tax,
      totalFee,
    };

    sessionStorage.setItem("appointmentInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Appointment" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmAppointmentPage">
        <div>
          <div className="confirmbookingArea">
            <Typography>Booking Info</Typography>
            <div className="confirmbookingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{bookingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
              <div>
                <p>Time Slot:</p>
                <span>{bookingInfo.time}</span>
              </div>
            </div>
          </div>
          <div className="confirmSelectionItems">
            <Typography>Your Selection Items:</Typography>
            <div className="confirmSelectionItemsContainer">
              {selectionItems &&
                selectionItems.map((item) => (
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
        <div>
          <div className="appointmentSummary">
            <Typography>Appointment Summary</Typography>
            <div>
              <div>
                {/* <p>Subtotal:</p>
                <span>Rs  {subtotal}</span>
              </div>
              <div> */}
                <p>Booking Charges:</p>
                <span>Rs  {bookingCharges}</span>
              </div>
              <div>
                <p>Tax:</p>
                <span>Rs {tax}</span>
              </div>
            </div>

            <div className="appointmentSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs {totalFee}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmAppointment;
