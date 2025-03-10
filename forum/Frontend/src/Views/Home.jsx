import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllThreads } from "../API";
import ThreadItem from "../Components/ThreadItem";
import Searchbar from "../Components/Searchbar";

export default function HomeView() {
  const [threads, setThreads] = useState([]); // Alla trådar
  const [filteredThreads, setFilteredThreads] = useState([]); // Filtrerade trådar
  const [searchInput, setSearchInput] = useState(""); // Söksträng

  useEffect(() => {
    // Hämta trådar när sidan laddas
    getAllThreads().then((data) => {
      setThreads(data); // Spara alla trådar
      setFilteredThreads(data); // Visa alla från start
    });
  }, []);

  // Hantera sökning
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);

    const filtered = threads.filter(
      (thread) =>
        thread.title.toLowerCase().includes(searchTerm) ||
        thread.content.toLowerCase().includes(searchTerm) ||
        thread.author.toLowerCase().includes(searchTerm)
    );

    setFilteredThreads(filtered);
  };

  return (
    <div className="task-container">
      <div className="header">
        <h1 className="header-title">Diskussionsforum</h1>
        <h3>Dela idéer och diskutera olika ämnen med andra användare</h3>

        <Searchbar
          searchInput={searchInput}
          handleSearchChange={handleSearchChange}
        />

        <Link className="add-task-btn" to="/add-thread">
          + Ny tråd
        </Link>
      </div>

      <ul>
        {filteredThreads.length === 0 ? (
          <p>Inga trådar matchade din sökning.</p>
        ) : (
          filteredThreads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))
        )}
      </ul>
    </div>
  );
}
