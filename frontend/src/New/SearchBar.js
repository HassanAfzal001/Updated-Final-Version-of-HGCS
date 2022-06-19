import React, { useState, useEffect } from "react";
import "./searchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
function SearchBar({ placeholder, data, setDoctorId, setDoctorName }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data?.filter((value) => {
      return value.name?.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleFilteredDataClick = (value) => {
    setWordEntered(value);
    setFilteredData([]);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData?.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p
                  onClick={() => {
                    handleFilteredDataClick(value.name);
                    setDoctorId(value?._id);
                    setDoctorName(value?.name);
                  }}
                >
                  {value.name}{" "}
                </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
