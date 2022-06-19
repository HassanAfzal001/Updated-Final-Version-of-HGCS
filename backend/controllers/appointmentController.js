const Appointment = require("../models/appointmentmodel");//Appointment
const Doctor = require("../models/doctorModel");//Doctor
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Appointment

exports.newAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    purpose,
    //gender info,
    name,
    paymentInfo,
    age,//tax,
    gender,
    time_limit, //total,
  } = req.body;

  const appointment = await Appointment.create({
    purpose,
    name,
    //appointmentfee,
    paymentInfo,
    //appointmentfee,
    age,
    gender,
    time_limit,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    appointment,
  });
});

// get Single Appointment
exports.getSingleAppointment = catchAsyncErrors(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!appointment) {
    return next(new ErrorHander("Appointment not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    appointment,
  });
});

// get logged in user  Appointments
exports.myAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    appointments,
  });
});

// get all Appointments -- Admin
exports.getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();

 // let totalAmount = 0;

  // Appointments.forEach((Appointment) => {
  //   totalAmount += Appointment.total;
  // });

  res.status(200).json({
    success: true,
    //totalAmount,
    appointments,
  });
});

// update Appointment Status -- Admin
exports.updateAppointment = catchAsyncErrors(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorHander("Appointment not found with this Id", 404));
  }

  if (appointment.appointmentStatus === "Accepted") {
    return next(new ErrorHander("Your request has been already accepted:", 400));
  }

  if (req.body.status === "Pending") {
    return next(new ErrorHander("Your request is pending:", 400));
    // Appointment.Appointmentappointmentfee.forEach(async (o) => {
    //   await updateMenu(o.doctor, o.quantity);
    // });
  }
  appointment.appointmentStatus = req.body.status;

  if (req.body.status === "Accepted") {
    appointment.acceptedAt = Date.now();
  }

  await appointment.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
//update menu
async function updateMenu(id, quantity) {
  const doctor = await Doctor.findById(id);

  doctor.Menu -= quantity;

  await doctor.save({ validateBeforeSave: false });
}

// delete Appointment -- Admin
exports.deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorHander("Appointment not found with this Id", 404));
  }

  await appointment.remove();

  res.status(200).json({
    success: true,
  });
});
