import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import DoctorDetails from "./component/Doctor/DoctorDetails";
import Doctors from "./component/Doctor/Doctors";
import Search from "./component/Doctor/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Selection from "./component/Selection/Selection";
import Booking from "./component/Selection/Booking";
import ConfirmAppointment from "./component/Selection/ConfirmAppointment";
import axios from "axios";
import Payment from "./component/Selection/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AppointmentSuccess from "./component/Selection/AppointmentSuccess";
import MyAppointments from "./component/Appointment/MyAppointments";
import AppointmentDetails from "./component/Appointment/AppointmentDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import DoctorList from "./component/Admin/DoctorList.js";
import NewDoctor from "./component/Admin/NewDoctor";
import UpdateDoctor from "./component/Admin/UpdateDoctor";
import AppointmentList from "./component/Admin/AppointmentList";
import ProcessAppointment from "./component/Admin/ProcessAppointment";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import DoctorReviews from "./component/Admin/DoctorReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";
import Appointments from "./New/Appointments";
import "bootstrap/dist/css/bootstrap.min.css";
import SetAppointment from "./New/SetAppointment";
import AppointmentRequests from "./New/AppointmentRequests";
import Messenger from "./Chat/Messenger";
import VideoCall from "./New/VideoCall";
import Notifications from "./New/Notifications";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8900");
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [arrivalNotification, setArrivalNotification] = useState();
  const [notifications, setNotifications] = useState();

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

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
  }, [socket]);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/doctor/:id" component={DoctorDetails} />
        <Route exact path="/doctors" component={Doctors} />
        <Route path="/doctors/:keyword" component={Doctors} />

        <Route exact path="/search" component={Search} />

        <Route exact path="/contact" component={Contact} />

        <Route exact path="/about" component={About} />

        <ProtectedRoute
          exact
          path="/account"
          component={Profile}
          notifications={notifications}
        />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        {/* new routes */}
        <ProtectedRoute exact path="/myappointments" component={Appointments} />
        <ProtectedRoute
          exact
          path="/setappointment"
          component={SetAppointment}
        />
        <ProtectedRoute
          exact
          path="/appointmentrequests"
          component={AppointmentRequests}
          arrivalNotification={arrivalNotification}
          setArrivalNotification={setArrivalNotification}
          notifications={notifications}
        />
        <ProtectedRoute exact path="/chat" component={Messenger} />
        <ProtectedRoute exact path="/videoCall" component={VideoCall} />
        <ProtectedRoute
          exact
          path="/notifications"
          component={Notifications}
          notifications={notifications}
          setNotifications={setNotifications}
        />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignUp} />

        <Route exact path="/selection" component={Selection} />

        <ProtectedRoute exact path="/booking" component={Booking} />

        <ProtectedRoute exact path="/success" component={AppointmentSuccess} />

        <ProtectedRoute exact path="/appointment" component={MyAppointments} />

        <ProtectedRoute
          exact
          path="/appointment/confirm"
          component={ConfirmAppointment}
        />

        <ProtectedRoute
          exact
          path="/appointment/:id"
          component={AppointmentDetails}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/doctors"
          isAdmin={true}
          component={DoctorList}
        />
        <ProtectedRoute
          exact
          path="/admin/doctor"
          isAdmin={true}
          component={NewDoctor}
        />

        <ProtectedRoute
          exact
          path="/admin/doctor/:id"
          isAdmin={true}
          component={UpdateDoctor}
        />
        <ProtectedRoute
          exact
          path="/admin/appointments"
          isAdmin={true}
          component={AppointmentList}
        />

        <ProtectedRoute
          exact
          path="/admin/appointment/:id"
          isAdmin={true}
          component={ProcessAppointment}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={DoctorReviews}
        />

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
