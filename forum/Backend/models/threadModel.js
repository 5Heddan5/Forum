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
export const getCommentByThreadId = (threadId) => {
  return db.prepare("SELECT * FROM comments WHERE thread_id = ?").all(threadId);
};

export const createComment = (threadId, author, content, date) => {
  const stmt = db.prepare(
    "INSERT INTO comments (thread_id, author, content, date) VALUES (?, ?, ?, ?)"
  );

  const result = stmt.run(threadId, author, content, date);
  return db
    .prepare("SELECT * FROM comments WHERE comment_id = ?")
    .get(result.lastInsertRowid);
};

// Lägg till dessa funktioner i threadModel.js

export const updateComment = (commentId, author, content) => {
  try {
    const stmt = db.prepare(
      "UPDATE comments SET author = ?, content = ? WHERE comment_id = ?"
    );
    const result = stmt.run(author, content, commentId);
    return result.changes > 0
      ? db.prepare("SELECT * FROM comments WHERE comment_id = ?").get(commentId)
      : null;
  } catch (error) {
    console.error("Database error in updateComment:", error);
    throw error; // Skicka felet vidare till rutten
  }
};

export const deleteComment = (commentId) => {
  const stmt = db.prepare("DELETE FROM comments WHERE comment_id = ?");
  const result = stmt.run(commentId);
  return result.changes > 0;
};
