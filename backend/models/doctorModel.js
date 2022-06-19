const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [false, "Please Enter Doctor's Name"],
    // trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Doctor Description"],
  },
  fee: {
    type: Number,
    required: [true, "Please Enter doctor Fee"],
    maxLength: [8, "Fee cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  // images: [
  //   {
  //     public_id: {
  //       type: String,
  //       required: false,
  //     },
  //     url: {
  //       type: String,
  //       required: false,
  //     },
  //   },
  // ],
  images:{
    type: String,
    required: [true, "Please Select an Image"],
  },
  category: {
    type: String,
    required: [true, "Please Enter doctor Category"],
  },
  menu: {
    type: Number,
    required: [false, "Please Enter doctor menu"],
    maxLength: [4, "menu cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  // reviews: [
  //   {
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],

  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("doctor", doctorSchema);
