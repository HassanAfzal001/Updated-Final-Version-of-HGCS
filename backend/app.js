const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
let cors = require("cors");
app.use(cors());

// Route Imports
const doctor = require("./routes/doctorRoute");
const patient = require("./routes/patientRoute");
const user = require("./routes/userRoute");
const appoint = require("./routes/appointmentRoute");
const payment = require("./routes/paymentRoute");
const doctorRouter = require("./routes/doctor");
const appointmentRouter = require("./routes/appointments");
const userRouter = require("./routes/user");
var myMessagesRouter = require("./routes/myMessages");
var myConversationRouter = require("./routes/myConversation");
var myNotification = require("./routes/notification");

app.use("/api/v1", doctor);
app.use("/api/v1", patient);
app.use("/api/v1", user);
app.use("/api/v1", appoint);
app.use("/api/v1", payment);
app.use("/doctors", doctorRouter);
app.use("/appointments", appointmentRouter);
app.use("/users", userRouter);
app.use("/myConversation", myConversationRouter);
app.use("/myMessages", myMessagesRouter);
app.use("/notification", myNotification);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
