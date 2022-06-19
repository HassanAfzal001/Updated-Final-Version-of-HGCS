const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
 bio_info: {
    street: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },

    state: {
      type: String,
      required: false,
    },

    country: {
      type: String,
      required: false,
    },
    pinCode: {
      type: Number,
      required: false,
    },
    phoneNo: {
      type: Number,
      required: false,
    },
  },
  appointmentInfo: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
      doctor: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctor",
        required: false,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
  },
  paidAt: {
    type: Date,
    required: false,
  },

  appointmentStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  requestAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("appointment", appointmentSchema);
