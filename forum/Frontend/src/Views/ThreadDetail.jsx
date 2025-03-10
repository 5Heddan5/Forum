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
    <div>
      <h1>{thread.title}</h1>
      <p>{thread.content}</p>
      <p>
        <strong>Author:</strong> {thread.author}
      </p>
      <p>
        <strong>Date:</strong> {thread.date}
      </p>

      <Link to={"/add-comment"}>+ Ny kommentar</Link>
      <Link to={"/"}>Cancel</Link>
    </div>
  );
}
