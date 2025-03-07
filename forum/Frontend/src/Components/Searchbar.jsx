// components/Searchbar.jsx
import React from "react";
import TextField from "@mui/material/TextField";

const Searchbar = ({ searchInput, handleSearchChange }) => {
  return (
    <div>
      <TextField
        label="Sök trådar..."
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Searchbar;
