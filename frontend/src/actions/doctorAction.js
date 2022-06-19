import axios from "axios";

import {
  ALL_DOCTOR_FAIL,
  ALL_DOCTOR_REQUEST,
  ALL_DOCTOR_SUCCESS,
  ADMIN_DOCTOR_REQUEST,
  ADMIN_DOCTOR_SUCCESS,
  ADMIN_DOCTOR_FAIL,
  NEW_DOCTOR_REQUEST,
  NEW_DOCTOR_SUCCESS,
  NEW_DOCTOR_FAIL,
  UPDATE_DOCTOR_REQUEST,
  UPDATE_DOCTOR_SUCCESS,
  UPDATE_DOCTOR_FAIL,
  DELETE_DOCTOR_REQUEST,
  DELETE_DOCTOR_SUCCESS,
  DELETE_DOCTOR_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/doctorConstants.js";

// Get All Doctors
export const getDoctor =
  (keyword = "", currentPage = 1, fee = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_DOCTOR_REQUEST });

      let link = `/api/v1/doctors?keyword=${keyword}&page=${currentPage}&fee[gte]=${fee[0]}&fee[lte]=${fee[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/doctors?keyword=${keyword}&page=${currentPage}&fee[gte]=${fee[0]}&fee[lte]=${fee[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_DOCTOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_DOCTOR_FAIL,
        payload: error.response?.data.message
      });
    }
  };

// Get All Doctors For Admin
export const getAdminDoctor = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DOCTOR_REQUEST });

    const { data } = await axios.get("/api/v1/admin/doctors");

    dispatch({
      type: ADMIN_DOCTOR_SUCCESS,
      payload: data.doctors,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DOCTOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Doctor
export const createDoctor = (doctorData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_DOCTOR_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/doctor/add`,
      doctorData,
      config
    );

    dispatch({
      type: NEW_DOCTOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_DOCTOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Doctor
export const updateDoctor = (id, doctorData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DOCTOR_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/doctor/${id}`,
      doctorData,
      config
    );

    dispatch({
      type: UPDATE_DOCTOR_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DOCTOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Doctor
export const deleteDoctor = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DOCTOR_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/doctor/${id}`);

    dispatch({
      type: DELETE_DOCTOR_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DOCTOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Doctors Details
export const getDoctorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOCTOR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/doctor/${id}`);

    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
      payload: data.doctor,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Doctor
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Doctor
export const deleteReviews = (reviewId, doctorId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&doctorId=${doctorId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
