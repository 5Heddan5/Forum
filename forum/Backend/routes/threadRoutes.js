import express from "express";
import {createThread, getAllThreads,} from "../controllers/threadController.js"; // Importera både skapa och hämta trådar
import validateThreadData from "../middlewares/ValidateThreads.js"; // Importera valideringsmiddleware

const router = express.Router();

// Definiera rutter för trådar
router.get("/", getAllThreads); // Tar bort extra "/threads"
router.post("/", validateThreadData, createThread);


export default router;


