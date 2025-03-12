import React from "react";
import TextField from "@mui/material/TextField";

const Searchbar = ({ searchInput, handleSearchChange }) => {
  return (
    <div>
      <TextField
        label="Type to serach"
        variant="outlined"
        value={searchInput}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Searchbar;
