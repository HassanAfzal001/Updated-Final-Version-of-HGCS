import {
  ADD_TO_SELECTION,
  REMOVE_SELECTION_ITEM,
  SAVE_BOOKING_INFO,
} from "../constants/selectionConstants";
import axios from "axios";

// Add to Selection
export const addItemsToSelection =
  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/doctor/${id}`);

    dispatch({
      type: ADD_TO_SELECTION,
      payload: {
        doctor: data.doctor._id,
        name: data.doctor.name,
        fee: data.doctor.fee,
        image: data.doctor.images[0].url,
        age: data.doctor.Age,
        quantity,
      },
    });

    localStorage.setItem(
      "selectionItems",
      JSON.stringify(getState().selection.selectionItems)
    );
  };

// REMOVE FROM SELECTION
export const removeItemsFromSelection = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_SELECTION_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "selectionItems",
    JSON.stringify(getState().selection.selectionItems)
  );
};

// SAVE BOOKING INFO
export const saveBookingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_BOOKING_INFO,
    payload: data,
  });

  localStorage.setItem("bookingInfo", JSON.stringify(data));
};
