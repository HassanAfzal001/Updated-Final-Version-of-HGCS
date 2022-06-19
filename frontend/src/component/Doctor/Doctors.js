import React, { Fragment, useEffect, useState } from "react";
import "./Doctors.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getDoctor } from "../../actions/doctorAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/DoctorCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
  "Neuro Surgeon",
  "Neurologist",
  "Radiologist",
  "Dentist",
  "Regular Doctor",
  "Psychologist",
];

const Doctors = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [fee, setFee] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  //const [ratings, setRatings] = useState(0);

  const {
    doctors,
    loading,
    error,
    doctorsCount,
    resultPerPage,
    filteredDoctorsCount,
  } = useSelector((state) => state.doctors);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const feeHandler = (event, newFee) => {
    setFee(newFee);
  };
  let count = filteredDoctorsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getDoctor(keyword, currentPage, fee, category));
  }, [dispatch, keyword, currentPage, fee, category, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="DOCTORS -- HGCS" />
          <h2 className="doctorsHeading">Doctors</h2>

          <div className="doctors">
            {doctors &&
              doctors.map((doctor) => (
                <ProductCard key={doctor._id} doctor={doctor} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Fee</Typography>
            <Slider
              value={fee}
              onChange={feeHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0 || "Free"}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            {/* <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset> */}
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={doctorsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Doctors;
