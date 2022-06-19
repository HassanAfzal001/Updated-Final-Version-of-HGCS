import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newDoctorReducer,
  newReviewReducer,
  doctorDetailsReducer,
  doctorReducer,
  doctorReviewsReducer,
  doctorsReducer,
  reviewReducer,
} from "./reducers/doctorReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import { selectionReducer } from "./reducers/selectionReducer";
import {
  allAppointmentsReducer,
  myAppointmentsReducer,
  newAppointmentReducer,
  appointmentDetailsReducer,
  appointmentReducer,
} from "./reducers/appointmentReducer";

const reducer = combineReducers({
  doctors: doctorsReducer,
  doctorDetails: doctorDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  selection: selectionReducer,
  newAppointment: newAppointmentReducer,
  myAppointments: myAppointmentsReducer,
  appointmentDetails: appointmentDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newDoctorReducer,
  doctor: doctorReducer,
  allAppointments: allAppointmentsReducer,
  appointment: appointmentReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  doctorReviews: doctorReviewsReducer,
  review: reviewReducer,
});

let initialState = {
  selection: {
    selectionItems: localStorage.getItem("selectionItems")
      ? JSON.parse(localStorage.getItem("selectionItems"))
      : [],
    bookingInfo: localStorage.getItem("bookingInfo")
      ? JSON.parse(localStorage.getItem("bookingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
