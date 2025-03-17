// components/ThreadForm.js
import { useState } from "react";

export default function ThreadForm({ onSubmit, onCancel, initialData = {} }) {
  // Sätter initialt värde för uppdatering/redigering eller tomma fält
  const [title, setTitle] = useState(initialData.title || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [content, setContent] = useState(initialData.content || "");
  const [author, setAuthor] = useState(initialData.author || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kollar att inga fält är tomma
    if (
      !title.trim() ||
      !category.trim() ||
      !content.trim() ||
      !author.trim()
    ) {
      return;
    }

    // Skapar tråd-objekt med tidsstämpel
    const threadData = {
      title,
      category,
      content,
      author,
      date: new Date()
        .toLocaleString("sv-SE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", ""),
    };

    onSubmit(threadData); // Skickar datan till föräldrakomponenten
  };

  return (
    <form className="add-thread-form" onSubmit={handleSubmit}>
      <h1>{initialData.title ? "Edit Thread" : "Add New Thread"}</h1>
      <input
        className="add-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title..."
        required
      />
      <input
        className="add-input"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter category..."
        required
      />
      <textarea
        className="add-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter content..."
        required
      />
      <input
        className="add-input"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Enter author..."
        required
      />
      <div className="button-group">
        <button className="save-btn" type="submit">
          {initialData.title ? "Update Thread" : "Add Thread"}
        </button>
        <button className="cancel-btn" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
