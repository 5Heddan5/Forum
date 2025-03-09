import React from "react";

const CustomDatePicker = ({ onDateChange, value }) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onDateChange(e.target.value)}
      required
    />
  );
};

export default CustomDatePicker;
