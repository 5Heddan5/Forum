// routes/threads.js
import express from "express";
import {
  getAllThreads,
  searchThreads,
} from "../controllers/threadController.js";

const router = express.Router();

// Hämta alla trådar
router.get("/", getAllThreads);

// Sök trådar
router.get("/search", searchThreads); // Ny sökrutt

export default router;
