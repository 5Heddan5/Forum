import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "./DatePicker";
import { addThread } from "../API/AddThread";

export default function AddThreadForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  const handleAddThread = async (e) => {
    e.preventDefault();

    const newThread = { title, content, author, date };
    console.log("Sending data:", newThread);

    try {
      await addThread(newThread);
      console.log("Thread added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding thread:", error.message);
    }
  };

  return (
    <form onSubmit={handleAddThread}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <CustomDatePicker onDateChange={(newDate) => setDate(newDate)} />
      <div className="button-group">
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </form>
  );
}
