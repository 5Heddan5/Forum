export const createThreadHelper = (db, title, content, author, date) => {
  const stmt = db.prepare(
    "INSERT INTO Threads (title, content, author, date) VALUES (?, ?, ?, ?)"
  );

  return stmt.run(title, content, author, date);
};
