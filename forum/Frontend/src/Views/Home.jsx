// Frontend/src/Views/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getThreads } from "../API/AddThread"; // För att hämta alla trådar om ingen sökning görs
import Searchbar from "../components/Searchbar"; // Sökfältet

export default function Home() {
  const [threads, setThreads] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // Hantera sökinput
  const [filteredThreads, setFilteredThreads] = useState([]); // För filtrerade trådar

  useEffect(() => {
    // Hämta alla trådar när komponenten laddas
    getThreads().then(setThreads);
  }, []);

  useEffect(() => {
    if (searchInput) {
      // Anropa sök-API när användaren skriver något i sökfältet
      fetch(`http://localhost:3000/threads/search?q=${searchInput}`)
        .then((response) => response.json())
        .then((data) => setFilteredThreads(data))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    } else {
      // Om inget sökord är angivet, visa alla trådar
      setFilteredThreads(threads);
    }
  }, [searchInput, threads]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value); // Uppdatera sökinput när användaren skriver
  };

  return (
    <div>
      <h1>Diskussionsforum</h1>
      <h3>Dela idéer och diskutera olika ämnen med andra användare</h3>
      <Link to="/add-thread">+ Ny Tråd</Link>

      <Searchbar
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}
      />

      <ul>
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread, index) => (
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
          ))
        ) : (
          <p>Inga trådar hittades</p>
        )}
      </ul>
    </div>
  );
}
