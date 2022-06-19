var mongoose = require("mongoose");

//Define a schema
var myNotificationSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
    },
    senderName: {
      type: String,
    },
    receiverId: {
      type: String,
    },
    receiverName: {
      type: String,
    },
    text: {
      type: String,
    },
    appointmentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = myNotification = mongoose.model(
  "myNotification",
  myNotificationSchema
);
