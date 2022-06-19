import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatOnline from "./ChatOnline";
import Conversation from "./Conversation";
import Message from "./Message";
import "./messenger.css";
import axios from "axios";
import io from "socket.io-client";
import SearchBarConvo from "../New/SearchBarConvo";
const socket = io.connect("http://localhost:8900");

const Messenger = () => {
  const [newMessage, setNewMessage] = useState();
  const [conversations, setConversations] = useState();
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const scrollRef = useRef();
  const [doctors, setDoctors] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit("addUser", user?._id);
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [user]);

  // fetch all messages of the current user
  useEffect(() => {
    getConversations();
  }, [user._id]);

  const getConversations = async () => {
    // get all conversation of a specific user i-e the one that is logged in Naseer
    // naseer employee id is : 6262243469482d6b557e3b59
    try {
      const res = await axios.get(
        `http://localhost:4000/myConversation/${user._id}`
      );
      // console.log(res.data);
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Get Messages for specific convo
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/myMessages/" + currentChat?._id
        );
        // console.log(res.data);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // fire this use Effect whenever messages changes
  // this useffect is to adjust the messages view to bottom whenever new message is sent
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [messages]);

  // Get all doctors
  useEffect(() => {
    const fetchData = async () => {
      // get the data from the api
      // const res = await axios.get("http://localhost:4000/doctors/");
      // const res = await axios.get("http://localhost:4000/users/doctors");
      const res = await axios.get(
        `http://localhost:4000/appointments/patient/${user._id}`
      );
      
      let acceptedDoctors = res.data.filter((acceptedDoctor) => {
        if (acceptedDoctor.status === "Accepted") return acceptedDoctor;
      });

      // jin doctors ne appointment accept kerli hai unki ids hamare pas agayi hai
      // ab ager koi doctor ke sath do dafa appointment hai tou usse hatha ker sirf eik baar search me show kerwana hai
      // removing duplicate doctors from accepted doctors
      acceptedDoctors = acceptedDoctors.filter(
        (v, i, a) => a.findIndex((v2) => v2.doctorId === v.doctorId) === i
      );
      // console.log(acceptedDoctors);
      // sare doctors agaye hamare pas
      // ab appointment me jiska status accepted ho sirf wo doctors show ho
      // console.log(res.data);
      setDoctors(acceptedDoctors);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const handleSendMessage = async (e) => {
    // e.preventDefault();
    // sender is the person that is currently logged in i-e Naseer
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:4000/myMessages/",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // send message when enter key pressed
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  // create a new conversation
  const newConversation = async (friendId, friendUsername) => {
    try {
      const res = await axios.post("http://localhost:4000/myConversation/", {
        senderId: user._id,
        receiverId: friendId,
      });
      getConversations();
    } catch (err) {
      console.log(err);
    }
    // console.log(res);
  };

  return (
    <div>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {user.role !== "Doctor" && (
              <SearchBarConvo
                placeholder="Search Doctors"
                data={doctors}
                newConversation={newConversation}
              />
            )}
            {conversations?.map((convo) => (
              <div onClick={() => setCurrentChat(convo)}>
                <Conversation conversation={convo} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.sender === user?._id}
                        userPhoto={user?.avatar.url}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
                    value={newMessage}
                  ></textarea>
                  <button
                    onClick={handleSendMessage}
                    className="chatSubmitButton"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                No Chat. Open Conversation to start a chat
              </span>
            )}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {onlineUsers?.length > 0 && (
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat}
              />
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Messenger;
