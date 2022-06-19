const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [false, "Please Enter Patient's Name"],
    // trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Patient Description"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  ],
  //

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("patient", patientSchema);
