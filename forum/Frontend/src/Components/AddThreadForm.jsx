import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "./DatePicker"; // Importera rätt path till CustomDatePicker

export default function AddThreadForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(""); // Initialt tomt datum

  // Hantera formulärinlämning
  const handleAddThread = async (e) => {
    e.preventDefault();

    const newThread = {
      title,
      content,
      author,
      date,
    };

    console.log("Sending data:", newThread); // Logga data som skickas

    try {
      const response = await fetch("http://localhost:3000/threads/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newThread),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Thread added:", data);
        navigate("/"); // Navigera tillbaka till startsidan eller en annan sida
      } else {
        console.error("Error adding thread:", data.message);
      }
    } catch (error) {
      console.error("Error in POST request:", error);
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
      {/* Använd CustomDatePicker för att välja datum */}
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
