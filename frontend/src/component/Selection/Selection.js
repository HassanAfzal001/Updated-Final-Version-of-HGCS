import React, { Fragment } from "react";
import "./Selection.css";
import SelectionItemCard from "./SelectionItemCard";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToSelection,
  removeItemsFromSelection,
} from "../../actions/selectionAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Selection = ({ history }) => {
  const dispatch = useDispatch();
  const { selectionItems } = useSelector((state) => state.selection);

  // const increaseQuantity = (id, quantity, age) => {
  //   const newQty = quantity + 1;
  //   if (age <= quantity) {
  //     return;
  //   }
  //   dispatch(addItemsToSelection(id, newQty));
  // };

  // const decreaseQuantity = (id, quantity) => {
  //   const newQty = quantity - 1;
  //   if (1 >= quantity) {
  //     return;
  //   }
  //   dispatch(addItemsToSelection(id, newQty));
  // };

  const deleteSelectionItems = (id) => {
    dispatch(removeItemsFromSelection(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=booking");
  };

  return (
    <Fragment>
      {selectionItems.length === 0 ? (
        <div className="emptySelection">
          <RemoveShoppingCartIcon />

          <Typography>No Doctor in Your Selection</Typography>
          <Link to="/doctors">View Doctors</Link>
        </div>
      ) : (
        <Fragment>
          <div className="selectionPage">
            <div className="selectionHeader">
              <h5>Doctor</h5>
              <h5> </h5>
              <h5>Fees</h5>
            </div>

            {selectionItems &&
              selectionItems.map((item) => (
                <div className="selectionContainer" key={item.doctor}>
                  <SelectionItemCard
                    item={item}
                    deleteSelectionItems={deleteSelectionItems}
                  />
                  <div className="selectionInput">
                    {/* <button
                      onClick={() =>
                        decreaseQuantity(item.doctor, item.quantity)
                      }
                    >
                      -
                    </button> */}
                    <input type="number" value={item.quantity} readOnly />
                    {/* <button
                      onClick={() =>
                        increaseQuantity(item.doctor, item.quantity, item.age)
                      }
                    >
                      +
                    </button> */}
                  </div>
                  <p className="selectionSubtotal">{`Rs${
                    item.fee * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="selectionGrossProfit">
              <div></div>
              <div className="selectionGrossProfitBox">
                <p>Total</p>
                <p>{`Rs ${selectionItems.reduce(
                  (acc, item) => acc + item.quantity * item.fee,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Proceed to Next</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Selection;
