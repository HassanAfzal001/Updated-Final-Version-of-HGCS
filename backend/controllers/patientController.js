const Patient =  require("../models/patientModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Doctor -- Admin
exports.createPatient = catchAsyncErrors(async (req, res, next) => {
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

  const patient = await Patient.create(req.body);

  res.status(201).json({
    success: true,
    patient,
  });
});

// Get All patient
exports.getAllPatient = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const patientsCount = await Patient.countDocuments();

  const apiFeature = new ApiFeatures(Patient.find(), req.query)
    .search()
    .filter();

  let Patients = await apiFeature.query;

  let filteredPatientsCount = Patients.length;

  apiFeature.pagination(resultPerPage);

  patients = await apiFeature.query;

  res.status(200).json({
    success: true,
    patients,
    patientsCount,
    resultPerPage,
    filteredPatientsCount,
  });
});

// Get All patient (Admin)
exports.getAdminPatients = catchAsyncErrors(async (req, res, next) => {
  const patients = await Patient.find();

  res.status(200).json({
    success: true,
    patients,
  });
});

// Get Patient Details
exports.getPatientDetails = catchAsyncErrors(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(new ErrorHander("Patient not found", 404));
  }

  res.status(200).json({
    success: true,
    patient,
  });
});

// Update Patient -- Admin

exports.updatePatient = catchAsyncErrors(async (req, res, next) => {
  let patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(new ErrorHander("Patient not found", 404));
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
    for (let i = 0; i < Patient.images.length; i++) {
      await cloudinary.v2.uploader.destroy(Patient.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "Patient",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    patient,
  });
});

// Delete Patient

exports.deletePatient = catchAsyncErrors(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(new ErrorHander("patient not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < Patient.images.length; i++) {
    await cloudinary.v2.uploader.destroy(Patient.images[i].public_id);
  }

  await Patient.remove();

  res.status(200).json({
    success: true,
    message: "patient Delete Successfully",
  });
});

// Create New Review or Update the review
// exports.createPatientReview = catchAsyncErrors(async (req, res, next) => {
//   const { rating, comment, DoctorId } = req.body;

//   const review = {
//     user: req.user._id,
//     name: req.user.name,
//     rating: Number(rating),
//     comment,
//   };

//   const patient = await Patient.findById(DoctorId);

//   const isReviewed = Patient.reviews.find(
//     (rev) => rev.user.toString() === req.user._id.toString()
//   );

//   if (isReviewed) {
//     Patient.reviews.forEach((rev) => {
//       if (rev.user.toString() === req.user._id.toString())
//         (rev.rating = rating), (rev.comment = comment);
//     });
//   } else {
//     Patient.reviews.push(review);
//     Patient.numOfReviews = Patient.reviews.length;
//   }

//   let avg = 0;

//   Doctor.reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   Doctor.ratings = avg / Doctor.reviews.length;

//   await doctor.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });

// // Get All Reviews of a Doctor
// exports.getDoctorReviews = catchAsyncErrors(async (req, res, next) => {
//   const doctor = await Doctor.findById(req.query.id);

//   if (!doctor) {
//     return next(new ErrorHander("Doctor not found", 404));
//   }

//   res.status(200).json({
//     success: true,
//     reviews: Doctor.reviews,
//   });
// });

// // Delete Review
// exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
//   const doctor = await Doctor.findById(req.query.DoctorId);

//   if (!doctor) {
//     return next(new ErrorHander("Doctor not found", 404));
//   }

//   const reviews = Doctor.reviews.filter(
//     (rev) => rev._id.toString() !== req.query.id.toString()
//   );

//   let avg = 0;

//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   let ratings = 0;

//   if (reviews.length === 0) {
//     ratings = 0;
//   } else {
//     ratings = avg / reviews.length;
//   }

//   const numOfReviews = reviews.length;

//   await Doctor.findByIdAndUpdate(
//     req.query.DoctorId,
//     {
//       reviews,
//       ratings,
//       numOfReviews,
//     },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   res.status(200).json({
//     success: true,
//   });
// });
