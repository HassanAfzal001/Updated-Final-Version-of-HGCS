import React, { useEffect, useState } from "react";
import "./message.css";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import axios from "axios";
const Message = ({ message, own, userPhoto }) => {
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState();
  // console.log(own);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:4000/users/${message.sender}`
      );
      // console.log(res.data.avatar.url);
      setUsers(res.data.avatar.url);
    };

    // call the function
    if (!own) {
      fetchData();
    }
  }, []);
  return (
    <div className={own ? "message" : "message own"}>
      <div className="messageTop">
        {own ? (
          <img className="messageImg" src={userPhoto} alt="" />
        ) : (
          <img className="messageImg" src={users} alt="" />
        )}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;