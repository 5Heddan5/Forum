import React from "react";

const CustomDatePicker = ({ onDateChange }) => {
  const handleChange = (e) => {
    const date = e.target.value; // Exempel: '2025-03-06'
    onDateChange(date); // Skicka tillbaka det valda datumet
  };

  return <input type="date" onChange={handleChange} />;
};

export default CustomDatePicker;
