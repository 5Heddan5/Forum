import React, { useState } from "react";

export default function CommentEditForm({ comment, onSubmit, onCancel }) {
  const [author, setAuthor] = useState(comment.author);
  const [content, setContent] = useState(comment.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedComment = { ...comment, author, content };
    onSubmit(updatedComment);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        className="comment-input"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        className="comment-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button className="submit-btn" type="submit">
        Save
      </button>
      <button className="submit-btn" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
