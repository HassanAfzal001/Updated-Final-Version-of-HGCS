import React from "react";
import "./SelectionItemCard.css";
import { Link } from "react-router-dom";

const SelectionItemCard = ({ item, deleteSelectionItems }) => {
  return (
    <div className="SelectionItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/doctor/${item.doctor}`}>{item.name}</Link>
        <span>{`Fee: Rs  ${item.fee}`}</span>
        <p onClick={() => deleteSelectionItems(item.doctor)}>Remove</p>
      </div>
    </div>
  );
};

export default SelectionItemCard;
