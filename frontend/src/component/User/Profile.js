import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect("http://localhost:8900");

const Profile = ({ history, notifications }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  useEffect(() => {
    socket.emit("addUser", user?._id);
  }, [user]);

  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      // alert("Appointment Notification");
      if (data.text === "Deleted") {
        if (user._id !== data.from) {
          const res = axios
            .get(`http://localhost:4000/users/${data.from}`)
            .then((data) => {
              // console.log(data);
              alert(
                `Your Appointment has been Rejected by DR. ${data.data.name}`
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (data.text === "Accepted") {
        const res = axios
          .get(`http://localhost:4000/users/${data.from}`)
          .then((data) => {
            // console.log(data);
            alert(
              `Your Appointment has been Accepted by DR. ${data.data.name}`
            );
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (data.text === "AppointmentRequest") {
        const res = axios
          .get(`http://localhost:4000/users/${data.from}`)
          .then((data) => {
            // console.log(data);
            alert(
              `You have a new Appointment Request from MR. ${data.data.name}`
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // });
      console.log(data);
    });
  }, [socket, notifications]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div style={{ marginTop: "70px" }}>
              {user.role == "Doctor" ? (
                <h1 style={{ marginLeft: "auto" }}>DR. {user.name} Profile</h1>
              ) : (
                <h1 style={{ marginLeft: "auto" }}>Mr {user.name} Profile</h1>
              )}
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                {user.role === "Doctor" && (
                  <Link to="/appointmentrequests">
                    View Appointment Requests
                  </Link>
                )}
                {user.role === "Patient" && (
                  <>
                    <Link to="/myappointments">My Appointments</Link>
                    <Link to="/setappointment">Set Appointment</Link>
                  </>
                )}
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
