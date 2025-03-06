import express from "express";
import { createThread } from "../controllers/threadController.js";
import validateThreadData from "../middlewares/ValidateThreads.js"; // Importera valideringsmiddleware

const router = express.Router();

// Definiera rutter för trådar
router.post("/add", validateThreadData, createThread); // Validera data innan du skapar en tråd

export default router;
