import React from "react";
import AddThreadForm from "../Components/AddThreadForm";

const AddThread = () => {
  return (
    <div className="add-thread-container">
      <h1>Add a New Thread</h1>
      <AddThreadForm /> {/* Här visas formuläret */}
    </div>
  );
};

export default AddThread;
