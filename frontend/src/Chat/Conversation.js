import axios from "axios";
import React, { useEffect, useState } from "react";
import "./conversation.css";
const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // get id having conversation with the current user
    const friendId = conversation.members.find((m) => m != currentUser._id);
    const getUser = async () => {
      try {
        // get user information using id
        const res = await axios(`http://localhost:4000/users/${friendId}`);
        // console.log("Conversation");
        // console.log(res.data);
        console.log();
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.avatar.url}
        alt=""
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
};

export default Conversation;
