import { Link } from "react-router-dom";

export default function ThreadItem({ thread }) {
  return (
    <div className="task-item">
      <h3 className="task-title">{thread.title}</h3>
      <p className="task-content">{thread.content}</p>
      <p className="task-author">Author: {thread.author}</p>
      <p className="task-date">Date: {thread.date}</p>
      <div className="task-actions">
        <Link to={`/edit-thread/${thread.id}`} className="edit-button">
          <span className="material-symbols-outlined">edit</span>
        </Link>
        <Link to={`/view-thread/${thread.id}`}>Visa mer</Link>
      </div>
    </div>
  );
}
