import React, { useState, useEffect } from "react";
import axios from "axios";
import "./searchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

const SearchBarConvo = ({ placeholder, data, newConversation }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [friendId, setFriendId] = useState();

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data?.filter((value) => {
      return value.doctorName?.toLowerCase().includes(searchWord.toLowerCase());
    });
    // console.log(newFilter);
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
          {wordEntered && (
            <div
              onClick={() => {
                newConversation(friendId, wordEntered);
                setFilteredData([]);
                setWordEntered("");
              }}
            >
              <AddIcon />
            </div>
          )}
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 6).map((value, key) => {
            return (
              <p
                onClick={() => {
                  console.log("Value:");
                  console.log(value);
                  handleFilteredDataClick(value.doctorName);
                  setFriendId(value?.doctorId);
                }}
              >
                {value.doctorName}{" "}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBarConvo;
