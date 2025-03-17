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
  const result = stmt.run(title, content, author, date, category); // Infogar en ny tråd i databsen
  return getThreadById(result.lastInsertRowid); // Returnerar den skapade tråden
}

// Uppdatera en tråd
export function updateThread(id, title, content, author, date, category) {
  const stmt = db.prepare(
    "UPDATE thread SET title = ?, content = ?, author = ?, date = ?, category = ? WHERE id = ?"
  );
  const result = stmt.run(title, content, author, date, category, id); // Uppdaterar trådens information

  return result.changes > 0 ? getThreadById(id) : null; // Returnerar den uppdaterade tråden om ändringar gjorts
}

// Ta bort en tråd
export function deleteThread(id) {
  const stmt = db.prepare("DELETE FROM thread WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0; // Returnerar true om en tråd togs bort, annars false
}

// Kommentarer
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
    // Skapar en tidsstämpel i svensk tidszon
    const date = new Date()
      .toLocaleString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", "");

    // Uppdatera kommentaren med tidsstämpel
    const stmt = db.prepare(
      "UPDATE comments SET author = ?, content = ?, date = ? WHERE comment_id = ?"
    );

    const result = stmt.run(author, content, date, commentId);
    
    // Returnerar den uppdaterade kommentaren om ändringar gjorts
    return result.changes > 0
      ? db.prepare("SELECT * FROM comments WHERE comment_id = ?").get(commentId)
      : null;
  } catch (error) {
    console.error("Database error in updateComment:", error);
    throw error;
  }
};

// Ta bort kommentarer
export const deleteComment = (commentId) => {
  const stmt = db.prepare("DELETE FROM comments WHERE comment_id = ?");
  const result = stmt.run(commentId);
  return result.changes > 0;
};
