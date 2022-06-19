import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Dropdown, Spinner } from "react-bootstrap";
import ReactLoading from "react-loading";
import DeleteIcon from "@material-ui/icons/DeleteForeverSharp";
import moment from "moment";
import axios from "axios";
import "./appointments.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8900");

const AppointmentRequests = ({
  arrivalNotification,
  setArrivalNotification,
  notifications,
}) => {
  const [allAppointments, setAllAppointments] = useState();
  // const [headers, setHeaders] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  //get All Appointments
  useEffect(() => {
    let userId = user._id;
    //   console.log("userId: " + userId);

    const fetchData = async () => {
      // get the data from the api
      let res;
      if (user.role == "Doctor") {
        res = await axios.get(
          `http://localhost:4000/appointments/doctor/${userId}`
        );
      } else if (user.role == "Patient") {
        res = await axios.get(
          `http://localhost:4000/appointments/patient/${userId}`
        );
      }
      // console.log(res.data);
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
  }, [allAppointments]);

  const handleDeleteAppointment = (appointment) => {
    // delete an appointment
    // console.log(appointment);
    const r = window.confirm("Would you like to remove this event?");
    if (r === true) {
      socket.emit("sendNotification", {
        from: user._id,
        to: appointment.userId,
        text: "Deleted",
      });
      const myObjj = {
        senderId: user._id,
        senderName: user.name,
        receiverId: appointment.userId,
        receiverName: appointment.userName,
        text: "Appointment Rejected",
        appointmentId: appointment._id,
      };
      axios
        .delete("http://localhost:4000/appointments/deleteAppointment", {
          data: { _id: appointment._id },
        })
        .then(() => {
          console.log("Deleted");
        });

      axios
        .post("http://localhost:4000/notification/addNewNotification", myObjj)
        .then((res) => {
          console.log("Notification Added");
          // console.log(res);
          console.log(res.data);
        });
    }
  };

  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      console.log("Hello");
      setArrivalNotification({
        sender: data.from,
        text: data.text,
        createdAt: Date.now(),
      });
      console.log(data);
    });
  }, [socket, notifications]);

  const handlePending = (appointment) => {
    if (appointment.status !== "Accepted") {
      const r = window.confirm("Would you like to accept this request?");
      if (r === true) {
        socket.emit("sendNotification", {
          from: user._id,
          to: appointment.userId,
          text: "Accepted",
        });
        const myObj = {
          _id: appointment._id,
          need: appointment.need,
          doctorId: appointment.doctorId,
          doctorName: appointment.doctorName,
          userId: appointment.userId,
          userName: appointment.userName,
          appointmentDate: appointment.appointmentDate,
          status: "Accepted",
        };
        const myObjj = {
          senderId: user._id,
          senderName: user.name,
          receiverId: appointment.userId,
          receiverName: appointment.userName,
          text: "Appointment Accepted",
          appointmentId: appointment._id,
        };
        // console.log(myObj);
        axios
          .put("http://localhost:4000/appointments/updateAppointment", myObj)
          .then((res) => {
            console.log("Updated");
            // console.log(res);
            console.log(res.data);
          });
        axios
          .post("http://localhost:4000/notification/addNewNotification", myObjj)
          .then((res) => {
            console.log("Notification Added");
            // console.log(res);
            console.log(res.data);
          });
      }
    }
  };

  const formatAMPM = (date) => {
    // var date = date.substr(0, 10);

    // var hours = date.substr(0, 5);
    // console.log(date.substr(3, 4));
    var hours = date.substr(0, 2);
    var minutes = date.substr(3, 4);
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  return (
    <div className="appointments-container">
      <h1>All Appointments</h1>
      <div className="appointments-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              {user.role === "Doctor" ? (
                <th>Patient Name</th>
              ) : (
                <th>Doctor Name</th>
              )}
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
                time = formatAMPM(time);
                return (
                  <tr key={myObj._id}>
                    {user.role === "Doctor" ? (
                      <td>{myObj.userName}</td>
                    ) : (
                      <td>{myObj.doctorName}</td>
                    )}
                    <td>{myObj.need}</td>
                    <td>{myObj.appointmentDate.substr(0, 10)}</td>
                    <td>{time}</td>
                    <td
                      onClick={() => handlePending(myObj)}
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
                <h1>No Appointment Requests</h1>
              </div>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentRequests;
