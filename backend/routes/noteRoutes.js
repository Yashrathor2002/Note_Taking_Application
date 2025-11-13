import express from "express";
import {
  getNotes,
  createNote,
  deleteNote,
  clearNotes,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getNotes); // Get all notes
router.post("/", createNote); // Create new note
router.delete("/:id", deleteNote); // Delete one note
router.delete("/", clearNotes); // Clear all notes

export default router;
