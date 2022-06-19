const Doctor = require("../models/doctorModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Doctor -- Admin
exports.createDoctor = catchAsyncErrors(async (req, res, next) => {
  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  // const imagesLinks = [];

  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "Doctors",
  //   });

  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }

  // req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const doctor = await Doctor.create(req.body);

  res.status(201).json({
    success: true,
    doctor,
  });
});

// Get All Doctor
exports.getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 4;
  const doctorsCount = await Doctor.countDocuments();

  const apiFeature = new ApiFeatures(Doctor.find(), req.query)
    .search()
    .filter();

  let Doctors = await apiFeature.query;

  let filteredDoctorsCount = Doctors.length;

  apiFeature.pagination(resultPerPage);

  doctors = await apiFeature.query;

  res.status(200).json({
    success: true,
    doctors,
    doctorsCount,
    resultPerPage,
    filteredDoctorsCount,
  });
});

// Get All Doctor (Admin)
exports.getAdminDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await Doctor.find();

  res.status(200).json({
    success: true,
    doctors,
  });
});

// Get Doctor Details
exports.getDoctorDetails = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new ErrorHander("Doctor not found", 404));
  }

  res.status(200).json({
    success: true,
    doctor,
  });
});

// Update Doctor -- Admin

exports.updateDoctor = catchAsyncErrors(async (req, res, next) => {
  let doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new ErrorHander("Doctor not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < Doctor.images.length; i++) {
      await cloudinary.v2.uploader.destroy(Doctor.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "Doctors",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    doctor,
  });
});

// Delete Doctor

exports.deleteDoctor = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new ErrorHander("Doctor not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < Doctor.images.length; i++) {
    await cloudinary.v2.uploader.destroy(Doctor.images[i].public_id);
  }

  await Doctor.remove();

  res.status(200).json({
    success: true,
    message: "Doctor Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createDoctorReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, DoctorId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const doctor = await Doctor.findById(DoctorId);

  const isReviewed = Doctor.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    Doctor.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    Doctor.reviews.push(review);
    Doctor.numOfReviews = Doctor.reviews.length;
  }

  let avg = 0;

  Doctor.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  Doctor.ratings = avg / Doctor.reviews.length;

  await doctor.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a Doctor
exports.getDoctorReviews = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.findById(req.query.id);

  if (!doctor) {
    return next(new ErrorHander("Doctor not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: Doctor.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.findById(req.query.DoctorId);

  if (!doctor) {
    return next(new ErrorHander("Doctor not found", 404));
  }

  const reviews = Doctor.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Doctor.findByIdAndUpdate(
    req.query.DoctorId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
