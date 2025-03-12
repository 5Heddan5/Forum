import Database from "better-sqlite3";

const db = new Database("./Forms.db");

// Skapa tabellen om den inte finns
db.prepare(
  `CREATE TABLE IF NOT EXISTS thread (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL
  )`
).run;

db.prepare(`CREATE TABLE IF NOT EXISTS comments (
  comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  thread_id INTEGER NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  FOREIGN KEY(thread_id) REFERENCES thread(id) ON DELETE CASCADE)`
).run;

export default db;
