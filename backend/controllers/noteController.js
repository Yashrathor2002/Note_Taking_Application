import Note from "../models/noteModel.js";

// ✅ Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required" });

    const note = new Note({ title, content });
    const saved = await note.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete a single note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Clear all notes
export const clearNotes = async (req, res) => {
  try {
    await Note.deleteMany({});
    res.json({ message: "All notes deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
