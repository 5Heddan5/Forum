import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getThreadById } from "../API";

export default function ThreadDetail() {
  const { id } = useParams(); // Hämtar trådens ID från URL:en

  // State för enskild tråd
  const [thread, setThread] = useState(null);

  useEffect(() => {
    async function fetchThread() {
      try {
        const data = await getThreadById(id); // Hämta tråd från API
        setThread(data);
      } catch (error) {
        console.error("Kunde inte hämta tråden:", error);
      }
    }
    fetchThread();
  }, [id]);

  if (!thread) {
    return <p>Laddar tråd...</p>;
  }

  return (
    <div className="thread-container">
      <h3>{thread.title}</h3>
      <p>{thread.author}</p>
      <p>{thread.date}</p>
      <p>{thread.content}</p>

      <Link to={"/add-comment"}>+ Ny kommentar</Link>
      <Link to={"/"}>Cancel</Link>
    </div>
  );
}
