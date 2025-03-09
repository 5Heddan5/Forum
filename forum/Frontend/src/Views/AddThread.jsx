import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addThread } from "../API";

export default function AddThreadView() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kontrollera att alla fält är ifyllda
    if (!title.trim() || !content.trim() || !author.trim() || !date.trim()) {
      return; // Om något fält är tomt, gör ingenting
    }

    try {
      // Lägg till tråden via API-anropet
      await addThread({ title, content, author, date });

      navigate("/"); // Om lyckad, navigera till hemsidan
    } catch (error) {
      console.error("Error adding thread:", error);
    }
  };

  return (
    <div>
      <div className="thread-container">
        <h1>Add Thread</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title..."
            required
          />
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Enter content..."
            required
          />
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange}
            placeholder="Enter author..."
            required
          />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
          <div className="button-group">
            <button type="submit">Add Thread</button>
            <button type="button" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
