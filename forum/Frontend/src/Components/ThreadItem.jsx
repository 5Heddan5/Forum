import { Link } from "react-router-dom";

export default function ThreadItem({ thread}) {
  return (
    <div className="task-item">
      <span className="task-text">{thread.title}</span>
      <div className="task-actions">
        <Link to={`/edit-task/${thread.id}`} className="edit-button">
          <span className="material-symbols-outlined">edit</span>{" "}
        </Link>
      </div>
    </div>
  );
}