import express from "express";
import {
  getAllThreads,
  getThreadById,
  createThread,
  updateThread,
  deleteThread,
  getCommentByThreadId,
  createComment,
  updateComment,
  deleteComment
} from "../models/threadModel.js";
import { validateThreadData } from "../middleware/validateThread.js";

const router = express.Router();

// Hämta alla trådar
router.get("/", (req, res) => {
  res.json(getAllThreads());
});

// Hämta en specifik tråd
router.get("/:id", (req, res) => {
  const thread = getThreadById(req.params.id);
  if (!thread) return res.status(404).json({ error: "Thread not found" });
  res.json(thread);
});

// Lägg till en ny tråd
router.post("/", validateThreadData, (req, res) => {
  const { title, content, author, date, category } = req.body;
  const newThread = createThread(title, content, author, date, category);
  res.status(201).json(newThread);
});

// Uppdatera en tråd
router.put("/:id", validateThreadData, (req, res) => {
  const { id } = req.params;
  const { title, content, author, date, category } = req.body;
  const updatedThread = updateThread(
    id,
    title,
    content,
    author,
    date,
    category
  );

  if (!updatedThread)
    return res.status(404).json({ error: "Thread not found" });

  res.json(updatedThread);
});

// Ta bort en tråd
router.delete("/:id", (req, res) => {
  if (!deleteThread(req.params.id)) {
    return res.status(404).json({ error: "Thread not found" });
  }
  res.status(200).json({ message: "Thread deleted successfully" });
});

// Rutter för kommentarer
router.get("/:id/comments", (req, res) => {
  const comments = getCommentByThreadId(req.params.id);
  res.json(comments);
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { author, content, date } = req.body;

  if (!author?.trim() || !content?.trim() || !date.trim()) {
    return res
      .status(400)
      .json({ error: "Author, content and date are required" });
  }

  const newComment = createComment(id, author, content, date);
  res.status(201).json(newComment);
});

export default router;

// Lägg till dessa rutter i router-objektet

router.put("/:threadId/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  const { author, content } = req.body;

  if (!author?.trim() || !content?.trim()) {
    return res.status(400).json({ error: "Author and content are required" });
  }

  const updatedComment = updateComment(commentId, author, content);
  if (!updatedComment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.json(updatedComment);
});

router.delete("/:threadId/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  if (!deleteComment(commentId)) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.status(200).json({ message: "Comment deleted successfully" });
});