import {
  ADD_TO_SELECTION,
  REMOVE_SELECTION_ITEM,
  SAVE_BOOKING_INFO,
} from "../constants/selectionConstants";

export const selectionReducer = (
  state = { selectionItems: [], bookingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_SELECTION:
      const item = action.payload;

      const isItemExist = state.selectionItems.find(
        (i) => i.doctor === item.doctor
      );

      if (isItemExist) {
        return {
          ...state,
          selectionItems: state.selectionItems.map((i) =>
            i.doctor === isItemExist.doctor ? item : i
          ),
        };
      } else {
        return {
          ...state,
          selectionItems: [...state.selectionItems, item],
        };
      }

    case REMOVE_SELECTION_ITEM:
      return {
        ...state,
        selectionItems: state.selectionItems.filter((i) => i.doctor !== action.payload),
      };

    case SAVE_BOOKING_INFO:
      return {
        ...state,
        bookingInfo: action.payload,
      };

    default:
      return state;
  }
};
