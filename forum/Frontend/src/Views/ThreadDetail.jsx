import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getThreadById, getComments, addComment } from "../API";

export default function ThreadDetail() {
  const { id } = useParams(); // Hämtar trådens ID från URL:en
  // State för enskild tråd
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    async function fetchThread() {
      try {
        const data = await getThreadById(id); // Hämta tråd från API
        setThread(data);

        const commentsData = await getComments(id);
        setComments(commentsData);
      } catch (error) {
        console.error("Kunde inte hämta tråden:", error);
      }
    }
    fetchThread();
  }, [id]);

const handleCommentSubmit = async (e) => {
  e.preventDefault();
  const newComment = {
    author: commentAuthor,
    content: commentContent,
    // Formatera datumet som "YYYY-MM-DD"
    date: new Date().toLocaleDateString("sv-SE"), // 'sv-SE' ger formatet YYYY-MM-DD
  };

  try {
    const addedComment = await addComment(id, newComment);
    setComments([...comments, addedComment]);
    setCommentAuthor("");
    setCommentContent("");
    setShowCommentForm(false); // Dölj formuläret
  } catch (error) {
    console.log("Couldn't add comment:", error);
  }
};


  if (!thread) {
    return <p>Laddar tråd...</p>;
  }

  return (
    <div className="thread-container">
      <h3>{thread.title}</h3>
      <p>{thread.author}</p>
      <p>{thread.date}</p>
      <p>{thread.content}</p>
      <button onClick={() => setShowCommentForm(!showCommentForm)}>
        {showCommentForm ? "Hide comments" : "+ New comment"} {/* Fixad text */}
      </button>
      <Link to={"/"}>Cancel</Link>

      {showCommentForm && (
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            required
          />
          <textarea
            placeholder="Write Comment"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          />
          <button type="submit">Upload comment</button>
        </form>
      )}
      <h4>Comments</h4>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              <p>{comment.content}</p>
              <p>
                Av: {comment.author} - {comment.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
