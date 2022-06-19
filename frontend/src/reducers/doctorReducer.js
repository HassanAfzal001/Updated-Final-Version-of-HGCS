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
  NEW_DOCTOR_RESET,
  UPDATE_DOCTOR_REQUEST,
  UPDATE_DOCTOR_SUCCESS,
  UPDATE_DOCTOR_FAIL,
  UPDATE_DOCTOR_RESET,
  DELETE_DOCTOR_REQUEST,
  DELETE_DOCTOR_SUCCESS,
  DELETE_DOCTOR_FAIL,
  DELETE_DOCTOR_RESET,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/doctorConstants.js";

export const doctorsReducer = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case ALL_DOCTOR_REQUEST:
    case ADMIN_DOCTOR_REQUEST:
      return {
        loading: true,
        doctors: [],
      };
    case ALL_DOCTOR_SUCCESS:
      return {
        loading: false,
        doctors: action.payload.doctors,
        doctorsCount: action.payload.doctorsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredDoctorsCount: action.payload.filteredDoctorsCount,
      };

    case ADMIN_DOCTOR_SUCCESS:
      return {
        loading: false,
        doctors: action.payload,
      };
    case ALL_DOCTOR_FAIL:
    case ADMIN_DOCTOR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newDoctorReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case NEW_DOCTOR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_DOCTOR_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        doctor: action.payload.doctor,
      };
    case NEW_DOCTOR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_DOCTOR_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const doctorReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DOCTOR_REQUEST:
    case UPDATE_DOCTOR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DOCTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_DOCTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_DOCTOR_FAIL:
    case UPDATE_DOCTOR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DOCTOR_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_DOCTOR_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const doctorDetailsReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case DOCTOR_DETAILS_SUCCESS:
      return {
        loading: false,
        doctor: action.payload,
      };
    case DOCTOR_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const doctorReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
