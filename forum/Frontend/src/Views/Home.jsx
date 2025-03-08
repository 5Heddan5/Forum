import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllThreads } from "../API";
import ThreadItem from "../components/ThreadItem";

export default function HomeView() {
  const [threads, setThread] = useState([]);

  useEffect(() => {
    // Fetch tasks when component mounts
    getAllThreads().then(setThread);
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="task-container">
      <div className="header">
        <h1 className="header-title">My To-Do List</h1>
        <Link className="add-task-btn" to="/add-thread">
          +
        </Link>
      </div>
      <ul>
        {threads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread}  />
        ))}
      </ul>
    </div>
  );
}
