import React, { useEffect, useState } from "react";
import "./appointments.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:8900");

const Notifications = ({ notifications, setNotifications }) => {
  const { user } = useSelector((state) => state.user);
  const [notification, setNotification] = useState();

  //get All Notifications
  useEffect(() => {
    let userId = user._id;
    //   console.log("userId: " + userId);

    const fetchData = async () => {
      // get the data from the api
      let res;
      if (user.role == "Doctor") {
        res = await axios.get(
          `http://localhost:4000/notification/doctor/${userId}`
        );
      } else if (user.role == "Patient") {
        res = await axios.get(
          `http://localhost:4000/notification/patient/${userId}`
        );
      }
      console.log(res.data);
      setNotification(res.data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const handleDelete = (notification) => {
    const r = window.confirm("Would you like to remove this notification?");
    if (r === true) {
      axios
        .delete("http://localhost:4000/notification/deleteNotification", {
          data: { _id: notification._id },
        })
        .then(() => {
          console.log("Deleted");
        });
    }
  };

  return (
    <div className="appointments-container">
      <h1>All Notifications</h1>
      <div className="appointments-table">
        <Table striped bordered hover>
          <thead>
            {notification &&
              notification.map((notificatio) => {
                if (user.role === "Patient") {
                  return (
                    <tr>
                      {notificatio.text === "Appointment Accepted" ? (
                        <th>
                          DR. {notificatio.senderName} has Accepted your
                          Appointment.
                          <span
                            style={{ marginLeft: "40px", fontWeight: "normal" }}
                          >
                            {format(notificatio.createdAt)}
                          </span>
                        </th>
                      ) : (
                        <th>
                          DR. {notificatio.senderName} has Rejected your
                          Appointment.
                          <span
                            style={{ marginLeft: "40px", fontWeight: "normal" }}
                          >
                            {format(notificatio.createdAt)}
                          </span>
                        </th>
                      )}
                      <button
                        className="notification-delete-button"
                        onClick={() => handleDelete(notificatio)}
                      >
                        Delete
                      </button>
                    </tr>
                  );
                } else if (user.role === "Doctor") {
                  return (
                    <tr>
                      <th>
                        Mr. {notificatio.senderName} has requested for an
                        Appointment.
                        <span
                          style={{ marginLeft: "40px", fontWeight: "normal" }}
                        >
                          {format(notificatio.createdAt)}
                        </span>
                      </th>
                      <button
                        className="notification-delete-button"
                        onClick={() => handleDelete(notificatio)}
                      >
                        Delete
                      </button>
                    </tr>
                  );
                }
              })}
          </thead>
        </Table>
      </div>
    </div>
  );
};

export default Notifications;
