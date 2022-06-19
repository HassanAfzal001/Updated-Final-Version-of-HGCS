import React, { Fragment, useEffect, useState } from "react";
import "./newDoctor.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createDoctor } from "../../actions/doctorAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
//import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_DOCTOR_RESET } from "../../constants/doctorConstants";

const NewDoctor = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [fee, setFee] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Age, setAge] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Neuro Surgeon",
    "Neurologist",
    "Radiologist",
    "Dentist",
    "Regular Doctor",
    "Psychologist",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Doctor Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_DOCTOR_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createDoctortSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("fee", fee);
    myForm.set("description", description);
    myForm.set("category", category);
    //myForm.set("Age", Age);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    // for (var [key, value] of myForm.entries()) {
    //   console.log(key, value);
    //  }

    dispatch(createDoctor(myForm));
  };

  const createDoctorImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
            onSubmit={createDoctortSubmitHandler}
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
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            {/* <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Age"
                required
                value={Age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div> */}

            <div id="createDoctorFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createDoctorImagesChange}
                multiple
              />
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

export default NewDoctor;
