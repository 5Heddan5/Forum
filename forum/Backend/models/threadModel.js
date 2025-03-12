import db from "../config/database.js";

// Hämta alla trådar
export function getAllThreads() {
  return db.prepare("SELECT * FROM thread").all();
}

// Hämta en tråd via ID
export function getThreadById(id) {
  return db.prepare("SELECT * FROM thread WHERE id = ?").get(id);
}

// Skapa en ny tråd
export function createThread(title, content, author, date, category) {
  const stmt = db.prepare(
    "INSERT INTO thread (title, content, author, date, category) VALUES (?, ?, ?, ?, ?)"
  );
  const result = stmt.run(title, content, author, date, category);
  return getThreadById(result.lastInsertRowid);
}

// Uppdatera en tråd
export function updateThread(id, title, content, author, date, category) {
  const stmt = db.prepare(
    "UPDATE thread SET title = ?, content = ?, author = ?, date = ?, category = ? WHERE id = ?"
  );
  const result = stmt.run(title, content, author, date, category, id);

  return result.changes > 0 ? getThreadById(id) : null;
}

// Ta bort en tråd
export function deleteThread(id) {
  const stmt = db.prepare("DELETE FROM thread WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}

// // Comments
// export const getCommentByThreadId = (threadId) => {
//   return db.prepare("SELECT * FROM comments WHERE thread_id = ?").all(threadId);
// };

// export const createComment = (threadId, author, comment, date) => {
//   const stmt = db.prepare(
//     "INSERT INTO comments WHERE (threadId, author, comment, date) VALUES (?, ?, ?, ?)"
//   );

//   const result = stmt.run(threadId, author, comment, date);
//   return db
//     .prepare("SELECT * FROM comments WHERE comment_id = ?")
//     .get(result.lastInsertRowid);
// };
