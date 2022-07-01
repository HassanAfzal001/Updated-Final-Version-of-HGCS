import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./setappointment.css";
import axios from "axios";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import moment from "moment";
// import { useHistory } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8900");

const SetAppointment = () => {
  const { user } = useSelector((state) => state.user);
  // let history = useHistory();
  const [newAppointment, setNewAppointment] = useState({
    need: "",
    appointmentDate: "",
  });
  const [data, setData] = useState();
  const [doctorId, setDoctorId] = useState();
  const [doctorName, setDoctorName] = useState();

  const fixTimezoneOffset = (date) => {
    if (!date) return "";
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toJSON();
  };

  useEffect(() => {
    socket.emit("addUser", user?._id);
  }, [user]);

  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      // alert("Appointment Notification");
      if (data.text === "Deleted") {
        if (user._id !== data.from ) {
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
  }, [socket]);
  
 // Add a meeting
 const addAppointment = () => {
  if (newAppointment.need && doctorId && newAppointment.appointmentDate) {
    // check whether selected date is in the past or not
    var now = new Date();
    // console.log(now.getMonth());
    // console.log(newAppointment.appointmentDate.getMonth());
    if (newAppointment.appointmentDate < now) {
      alert("Selected date is in the past. Please Choose Another Date");
    } else {
      console.log("Selected date is NOT in the past");
      let selectedYear = newAppointment.appointmentDate.getFullYear();
      let selectedMonth = newAppointment.appointmentDate.getMonth();
      let nowYear = now.getFullYear();
      let nowMonth = now.getMonth();
      if (selectedYear === nowYear) {
        if (selectedMonth >= nowMonth + 3) {
          alert("Please Choose the date in the next three months");
        } else {
          var date = fixTimezoneOffset(newAppointment.appointmentDate);
          // var check = appointmentCheck(doctorId, date);
          // console.log(check);
          // 2 appointment for the same doctor should not be added
          const res = axios
            .get(`http://localhost:4000/appointments/doctor/${doctorId}`)
            .then((data) => {
              const found = data.data.find((obj) => {
                return (
                  obj.doctorId === doctorId && obj.appointmentDate === date
                );
              });

              console.log(found);
              // obj.appointmentDate === date

              if (found) {
                alert(
                  "Appointment cannot be booked at this time. Choose another Time Please"
                );
              } else {
                var datee = fixTimezoneOffset(newAppointment.appointmentDate);
                const res = axios
                  .get(
                    `http://localhost:4000/appointments/patient/${user._id}`
                  )
                  .then((data) => {
                    const anotherFound = data.data.find((obj) => {
                      return (
                        obj.userId === user._id &&
                        obj.appointmentDate === datee
                      );
                    });
                    if (anotherFound) {
                      alert(
                        "You already have an appointment at this time. choose Another time Please"
                      );
                    } else {
                      socket.emit("sendNotification", {
                        from: user._id,
                        to: doctorId,
                        text: "AppointmentRequest",
                      });
                      let userId = user._id;
                      const myObj = {
                        need: newAppointment.need,
                        doctorId: doctorId,
                        doctorName: doctorName,
                        userId: userId,
                        userName: user.name,
                        appointmentDate: fixTimezoneOffset(
                          newAppointment.appointmentDate
                        ),
                      };

                      const myObjj = {
                        senderId: user._id,
                        senderName: user.name,
                        receiverId: doctorId,
                        receiverName: doctorName,
                        text: "New Appointment Request",
                        appointmentId: newAppointment._id,
                      };

                      //   console.log(myObj);
                      axios
                        .post(
                          "http://localhost:4000/appointments/addNewAppointment",
                          myObj
                        )
                        .then((res) => {
                          console.log("Appointment Added: ");
                          // console.log(res);
                          console.log(res.data);
                        });
                      axios
                        .post(
                          "http://localhost:4000/notification/addNewNotification",
                          myObjj
                        )
                        .then((res) => {
                          console.log("Notification Added");
                          // console.log(res);
                          console.log(res.data);
                        });
                      setNewAppointment({
                        need: "",
                        appointmentDate: "",
                      });
                      setDoctorId();
                      setDoctorName();
                      // history.push("/appointmentrequests");
                    }
                  });
              }
            })
            .catch((err) => {
              console.log(
                "Error in SET Appointment component function add apppointment" +
                  err
              );
            });
        }
      } else {
        alert("Please Choose the date in the next three months");
      }
    }
  } else {
    alert("Please Fill All Required Fields");
  }
};

  // Get all doctors
  useEffect(() => {
    const fetchData = async () => {
      // get the data from the api
      // const res = await axios.get("http://localhost:4000/doctors/");
      const res = await axios.get("http://localhost:4000/users/doctors");
      //   console.log(res.data);
      setData(res.data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <div className="set-appointment-container">
      <div
        className="modalContainer"
        style={{ marginLeft: "30%", marginTop: "50px" }}
      >
        <h1>Set Appointment</h1>
        <input
          type="text"
          placeholder="Enter Need for Appointment"
          className="inputTextFields"
          value={newAppointment.need}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, need: e.target.value })
          }
        />
        <DatePicker
          placeholderText="Start Date & Time"
          selected={newAppointment.appointmentDate}
          onChange={(appointmentDate) =>
            setNewAppointment({ ...newAppointment, appointmentDate })
          }
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm"
          showTimeInput
          className="inputTextFields"
          minDate={moment().toDate()}
        />
        <SearchBar
          placeholder="Search Doctors"
          data={data}
          setDoctorId={setDoctorId}
          setDoctorName={setDoctorName}
        />
        <div className="addMeetButtonContainer">
          <button className="addMeetButton" onClick={() => addAppointment()}>
            Set Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetAppointment;
