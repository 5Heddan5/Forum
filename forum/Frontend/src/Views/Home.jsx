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
        thread.author.toLowerCase().includes(searchTerm) ||
        thread.category.toLowerCase().includes(searchTerm)
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
    <div className="thread-container">
      <div className="header">
        <h1 className="header-title">Discussion Forum</h1>
        <h3>Share ideas and discuss various topics with other users</h3>

        <div className="header-components">
          <Searchbar
            className="search"
            searchInput={searchInput}
            handleSearchChange={handleSearchChange}
          />

          <SortDate
            className="date"
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />

          <Link className="add-task-btn" to="/add-thread">
            Add new thread +
          </Link>
        </div>
      </div>

      <ul>
        {sortedThreads.length === 0 ? (
          <p>No threads in your search</p>
        ) : (
          sortedThreads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))
        )}
      </ul>
    </div>
  );
}
