import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getThreads } from "../API/AddThread";
export default function Home() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getThreads().then(setThreads);
  }, []);

  return (
    <div>
      <h1>Diskussionsforum</h1>
      <h3>Dela idéer och diskutera olika ämnen med andra användare</h3>
      <Link to="/add-thread">+ Ny Tråd</Link>
      <ul>
        {threads.map((thread, index) => (
          <li key={index} className="thread-item">
            <h3>{thread.title}</h3>
            <p>{thread.content}</p>
            <p>
              <strong>Author:</strong> {thread.author}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(thread.date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
