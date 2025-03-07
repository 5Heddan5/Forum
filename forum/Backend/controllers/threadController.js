// controllers/threadController.js
import db from "../db.js"; // Databasanslutning

// Hämta alla trådar (GET)
export const getAllThreads = (req, res) => {
  try {
    const threads = db.prepare("SELECT * FROM Threads").all();
    res.json(threads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get threads", error: error.message });
  }
};

// Sök trådar (GET)
export const searchThreads = (req, res) => {
  const searchTerm = req.query.q?.toLowerCase(); // Hämta sökordet från query-paramen

  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    // Hämta alla trådar
    const threads = db.prepare("SELECT * FROM Threads").all();

    // Filtrera trådar baserat på sökterm
    const filteredThreads = threads.filter(
      (thread) =>
        thread.title.toLowerCase().includes(searchTerm) ||
        thread.content.toLowerCase().includes(searchTerm)
    );

    // Returnera de filtrerade trådarna
    res.json(filteredThreads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to search threads", error: error.message });
  }
};
