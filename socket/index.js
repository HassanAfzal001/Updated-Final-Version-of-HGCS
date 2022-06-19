const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getUserUsingSocketId = (socketId) => {
  return users.find((user) => user.socketId === socketId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  // Messenger

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("users");
    console.log(users);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // Send Notification
  socket.on("sendNotification", ({ from, to, text }) => {
    // console.log("hello");
    // console.log(users);
    console.log(to);
    const user = getUser(to);
    console.log("specific user socket ID");
    console.log(user);
    if (user) {
      io.to(user.socketId).emit("receiveNotification", {
        from,
        text,
      });
    }
  });

  // Video Call

  socket.emit("me", socket.id);

  socket.on("callUser", (data) => {
    // console.log(data.userToCall);
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    // console.log("Answer Call");
    io.to(data.to).emit("callAccepted", data.signal);
  });

  //Get User Socket id
  socket.on("getUserSocketId", (friendId, userId) => {
    const friend = getUser(friendId);
    const user = getUser(userId);
    console.log(user);
    console.log(friend);
    io.to(user?.socketId).emit("userSocketId", friend);
    // io.emit("getUsers", users);
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
