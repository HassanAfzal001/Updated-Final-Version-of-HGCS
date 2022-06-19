import axios from "axios";
import { useEffect, useState } from "react";
import "./chatonline.css";
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";
import VideoCallIcon from "@material-ui/icons/VideoCall";
export default function ChatOnline({
  onlineUsers,
  currentId,
  setCurrentChat,
  handleChatOnlineClick,
  callUser,
  idToCall,
  callAccepted,
  callEnded,
  leaveCall,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("http://localhost:4000/users/doctors");
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends?.filter((o1) => onlineUsers?.some((o2) => o1._id == o2.userId))
    );
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    // when clicked we should get that user socket id so we can call on that socket id
    // console.log(user);
    handleChatOnlineClick(user);
  };

  return (
    <div className="chatOnline">
      <h2>Online Doctors</h2>
      {onlineFriends?.map((o) => (
        <div
          className="chatOnlineFriend"
          onClick={() => callUser != undefined && handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={o?.avatar.url} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.name}</span>
          {callUser != undefined && (
            <div className="call-button">
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={leaveCall}
                >
                  End Call
                </Button>
              ) : (
                <IconButton
                  color="primary"
                  aria-label="call"
                  onClick={() => callUser(idToCall)}
                >
                  <VideoCallIcon fontSize="large" />
                </IconButton>
              )}
              {/* {idToCall} */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
