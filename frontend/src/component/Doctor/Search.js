import React, { useState, Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import axios from "axios";
//import UsersDoctorCard from "../../New/UsersDoctorCard";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [usersDoctors, setUsersDoctors] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const usersDocs = await axios.get("http://localhost:4000/users/doctors");
      setUsersDoctors(usersDocs.data);
      console.log(usersDocs.data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    let obj = usersDoctors.find((o) => o.name === keyword);
    if (obj) {
      history.push(`localhost:4000/users/doctors/${obj.name}`);
    }
    if (keyword.trim()) {
      history.push(`/doctors/${keyword}`);
      // history.push("http://localhost:4000/users/doctors");
    } else {
      history.push("/users/doctors");
    }
  };

  
  return (
    <Fragment>
      <MetaData title="Search A Doctor -- HGCS" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Doctor ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
