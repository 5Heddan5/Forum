import { Link } from "react-router-dom";
export default function ThreadItem({ thread }) {
  return (
    <div className="thread-item">
      <div className="thread-header">
        <h3 className="thread-title">{thread.title}</h3>
        <p className="thread-category">{thread.category}</p>
      </div>
      <div className="author">
        <p className="thread-author"> {thread.author}</p>
        <p className="thread-date"> {thread.date}</p>
      </div>
      <p className="thread-content">{thread.content}</p>
      <div className="thread-actions">
        <div className="right-links">
          <Link to={`/view-thread/${thread.id}`}>View Thread</Link>
          <Link to={`/edit-thread/${thread.id}`} className="edit-button">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
