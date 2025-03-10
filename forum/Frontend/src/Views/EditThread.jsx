import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThreadById, updateThread } from "../API";

export default function EditThread() {
  const { id } = useParams(); // Hämtar trådens ID från URL:en
  const navigate = useNavigate();

  // State för trådens innehåll
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function fetchThread() {
      const data = await getThreadById(id); // Hämta tråd från API
      setTitle(data.title);
      setContent(data.content);
      setAuthor(data.author);
      setDate(data.date);
    }
    fetchThread();
  }, [id]);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim() || !author.trim() || !date.trim()) {
      alert("Alla fält måste vara ifyllda!");
      return;
    }

    await updateThread(id, { title, content, author, date }); // Uppdatera tråden
    navigate("/"); // 
  };

  return (
    <div>
      <h1>Edit Thread</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Update Thread</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
