import express from "express";
import {
  getAllThreads,
  getThreadById,
  createThread,
  updateThread,
  deleteThread,
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

export default router;
