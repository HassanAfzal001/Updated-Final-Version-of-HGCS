import React, { useState, Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import axios from "axios";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [usersDoctors, setUsersDoctors] = useState();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    let obj = usersDoctors.find((o) => o.name === keyword);
    if (obj) {
      history.push(`/doctors/${obj.name}`);
    }
    if (keyword.trim()) {
      history.push(`/doctors/${keyword}`);
    } else {
      history.push("/doctors");
    }
  };

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
