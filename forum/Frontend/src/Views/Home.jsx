import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllThreads } from "../API";
import ThreadItem from "../Components/ThreadItem";
import Searchbar from "../Components/Searchbar";
import SortDate from "../Components/SortDate";

export default function HomeView() {
  const [threads, setThreads] = useState([]); // Alla trådar
  const [filteredThreads, setFilteredThreads] = useState([]); // Filtrerade trådar
  const [searchInput, setSearchInput] = useState(""); // Söksträng
  const [sortOrder, setSortOrder] = useState("desc");

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

  // Hantera sortering
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Sortera trådar baserat på val
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="task-container">
      <div className="header">
        <h1 className="header-title">Diskussionsforum</h1>
        <h3>Dela idéer och diskutera olika ämnen med andra användare</h3>

        <Searchbar
          searchInput={searchInput}
          handleSearchChange={handleSearchChange}
        />

        <SortDate sortOrder={sortOrder} onSortChange={handleSortChange} />

        <Link className="add-task-btn" to="/add-thread">
          + Ny tråd
        </Link>
      </div>

      <ul>
        {sortedThreads.length === 0 ? (
          <p>Inga trådar matchade din sökning.</p>
        ) : (
          sortedThreads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))
        )}
      </ul>
    </div>
  );
}
