import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllThreads } from "../API";
import ThreadItem from "../Components/ThreadItem";

export default function HomeView() {
  const [threads, setThread] = useState([]);

  useEffect(() => {
    // Fetch trådar när komponenten laddas
    getAllThreads().then((data) => {
      setThread(data); // Sätt de hämtade trådarna i state
    });
  }, []); // Tomt beroende-array gör att det bara körs en gång

  return (
    <div className="task-container">
      <div className="header">
        <h1 className="header-title">Diskussionsforum</h1>
        <h3>Dela idéer och diskutera olika ämnen med andra användare</h3>
        <Link className="add-task-btn" to="/add-thread">
          + Ny tråd
        </Link>
      </div>
      <ul>
        {threads.length === 0 ? (
          <p>Inga trådar finns än.</p>
        ) : (
          threads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))
        )}
      </ul>
    </div>
  );
}
