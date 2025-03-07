import db from "../db.js"; // Databasanslutning

// Skapa en ny tråd (POST)
export const createThread = (req, res) => {
  const { title, content, author, date } = req.body;

  const stmt = db.prepare(
    "INSERT INTO Threads (title, content, author, date) VALUES (?, ?, ?, ?)"
  );

  try {
    const result = stmt.run(title, content, author, date);
    res.status(200).json({
      message: "Thread added successfully",
      threadId: result.lastInsertRowid,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add thread", error: err.message });
  }
};

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
