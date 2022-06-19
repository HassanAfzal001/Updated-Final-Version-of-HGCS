import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Dropdown, Spinner } from "react-bootstrap";
import ReactLoading from "react-loading";
import DeleteIcon from "@material-ui/icons/DeleteForeverSharp";
import moment from "moment";
import axios from "axios";
import "./appointments.css";
const Appointments = () => {
  const [allAppointments, setAllAppointments] = useState();
  // const [headers, setHeaders] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  //get All Appointments
  useEffect(() => {
    let userId = user._id;
    //   console.log("userId: " + userId);

    const fetchData = async () => {
      // get the data from the api
      const res = await axios.get(
        `http://localhost:4000/appointments/Patient/${userId}`
      );
      console.log(res.data);
      setAllAppointments(res.data);
      setLoading(false);
      // console.log(Object.keys(res.data[0]));
      // setHeaders(Object.keys(res.data[0]));
      // console.log("loading", loading);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const handleDeleteAppointment = (appointment) => {
    // delete an appointment
    // console.log(appointment);
    const r = window.confirm("Would you like to remove this event?");
    if (r === true) {
      axios
        .delete("http://localhost:4000/appointments/deleteAppointment", {
          data: { _id: appointment._id },
        })
        .then(() => {
          console.log("Deleted");
        });
    }
  };

  return (
    <div className="appointments-container">
      <h1>All Appointments</h1>
      <div className="appointments-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Need</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments?.length != 0 ? (
              allAppointments?.map((myObj, key) => {
                var time = moment.utc(myObj.appointmentDate).format("HH:mm");
                return (
                  <tr key={myObj._id}>
                    <td>{myObj.doctorName}</td>
                    <td>{myObj.need}</td>
                    <td>{myObj.appointmentDate.substr(0, 10)}</td>
                    <td>{time}</td>
                    <td
                      className={`appointments-status-pending ${
                        myObj.status === "Pending"
                          ? ""
                          : " appointments-status-accepted"
                      }`}
                    >
                      {myObj.status}
                    </td>
                    <td>
                      {user._id && myObj.userId && (
                        <DeleteIcon
                          className="delete-icon"
                          onClick={() => handleDeleteAppointment(myObj)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>
                <h1>No Appointments</h1>
              </div>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Appointments;
