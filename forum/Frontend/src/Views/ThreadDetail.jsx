import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllThreads } from "../API";
import ThreadItem from "../Components/ThreadItem";
export default function ThreadDetail() {
      const [threads, setThread] = useState([]);
    
      useEffect(() => {
        // Fetch trådar när komponenten laddas
        getAllThreads().then((data) => {
          setThread(data); // Sätt de hämtade trådarna i state
        });
      }, []); // Tomt beroende-array gör att det bara körs en gång
    
    return (
        <div>
            <h1>Thread</h1>
                  <ul>
                    {threads.length === 0 ? (
                      <p>Inga trådar finns än.</p>
                    ) : (
                      threads.map((thread) => (
                        <ThreadItem key={thread.id} thread={thread} />
                      ))
                    )}
                  </ul>
            <Link to={"/add-comment"}>+ Ny kommentar</Link>
        </div>
    );
}