import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const db = new Database("./Forms.db");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create a "tasks" table if it doesn't exist
db.prepare(
  `CREATE TABLE IF NOT EXISTS thread (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL
  )`
).run();

// Route to get all tasks
app.get("/threads", (req, res) => {
  const tasks = db.prepare("SELECT * FROM thread").all();
  res.json(tasks);
});

// Route to add a task
// Route to update a task by ID
app.put("/threads/:id", (req, res) => {
  const { id } = req.params;
  const { thing } = req.body;

  // Update the task in the database
  const stmt = db.prepare("UPDATE thread SET title = ? WHERE id = ?");
  const result = stmt.run(thing, id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Thread not found" });
  }

  // Fetch and return the updated task
  const updatedTask = db.prepare("SELECT * FROM thread WHERE id = ?").get(id);
  res.json(updatedTask);
});

// Route to add a task
app.post("/threads", (req, res) => {
  const { title, content, author, date } = req.body;

  // Kontrollera om titeln är tom
  if (!title?.trim() || !content?.trim() || !author?.trim() || !date?.trim()) {
    return res
      .status(400)
      .json({
        error: "All fields (title, content, author, date) are required",
      });
  }

  // Lägg till den nya tråden i databasen
  const stmt = db.prepare(
    "INSERT INTO thread (title, content, author, date) VALUES (?, ?, ?, ?)"
  );
  const result = stmt.run(title, content, author, date);

  // Hämta den nyligen tillagda tråden (inklusive dess ID)
  const newThread = db
    .prepare("SELECT * FROM thread WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newThread); // Returnera den nya tråden med status 201 (created)
});

// Route to delete a task by ID
app.delete("/threads/:id", (req, res) => {
  const { id } = req.params;

  // Delete task from database
  const stmt = db.prepare("DELETE FROM thread WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Thread not found" });
  }

  res.status(200).json({ message: "Thread deleted successfully" });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
  console.log("Server running on http://localhost:3000");
});
