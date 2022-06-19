import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateDoctor,
  getDoctorDetails,
} from "../../actions/doctorAction.js";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_DOCTOR_RESET } from "../../constants/doctorConstants";

const UpdateDoctor = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, doctor } = useSelector((state) => state.doctorDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.doctor);

  const [name, setName] = useState("");
  const [fee, setFee] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Age, setAge] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const doctorId = match.params.id;

  useEffect(() => {
    if (doctor && doctor._id !== doctorId) {
      dispatch(getDoctorDetails(doctorId));
    } else {
      setName(doctor.name);
      setDescription(doctor.description);
      setFee(doctor.fee);
      setCategory(doctor.category);
      setAge(doctor.Age);
      setOldImages(doctor.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Doctor Updated Successfully");
      history.push("/admin/doctors");
      dispatch({ type: UPDATE_DOCTOR_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    doctorId,
    doctor,
    updateError,
  ]);

  const updateDoctorSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("fee", fee);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Age", Age);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateDoctor(doctorId, myForm));
  };

  const updateDoctorImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Doctor" />
      <div className="dashboard">
        <SideBar />
        <div className="newDoctorContainer">
          <form
            className="createDoctorForm"
            encType="multipart/form-data"
            onSubmit={updateDoctorSubmitHandler}
          >
            <h1>Create Doctor</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Doctor Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Fee"
                required
                onChange={(e) => setFee(e.target.value)}
                value={fee}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Doctor Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Age"
                required
                onChange={(e) => setAge(e.target.value)}
                value={Age}
              />
            </div>

            <div id="createDoctorFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateDoctorImagesChange}
                multiple
              />
            </div>

            <div id="createDoctorFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Doctor Preview" />
                ))}
            </div>

            <div id="createDoctorFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Doctor Preview" />
              ))}
            </div>

            <Button
              id="createDoctorBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateDoctor;
