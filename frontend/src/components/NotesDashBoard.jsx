import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotesDashboard() {
  const [notes, setNotes] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = "https://note-taking-application-backend.vercel.app";
  // ✅ Fetch notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/notes`);
      setNotes(res.data);
    } catch (err) {
      toast.error("Error fetching notes!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Save Note
  const saveNote = async () => {
    if (!content.trim()) {
      toast.warning("⚠️ Content cannot be empty!");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/notes`, {
        title: title || "Untitled",
        content,
      });
      setNotes((prev) => [res.data, ...prev]);
      toast.success("✅ Note saved!");
      setTitle("");
      setContent("");
      setShowEditor(false);
    } catch (err) {
      toast.error("❌ Error saving note!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete one note
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.info("🗑️ Note deleted");
    } catch (err) {
      toast.error("❌ Error deleting note!");
      console.error(err);
    }
  };

  // ✅ Clear all
  const clearAll = async () => {
    if (!window.confirm("Are you sure you want to delete all notes?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/notes`);
      setNotes([]);
      toast.success("🧹 All notes deleted!");
    } catch (err) {
      toast.error("❌ Error clearing notes!");
      console.error(err);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const lower = search.toLowerCase();
    return (
      note.title.toLowerCase().includes(lower) ||
      note.content.toLowerCase().includes(lower)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#151515] to-[#1a1a1a] text-white px-4 py-10  font-[Inter]">
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "#1e1e1e",
          color: "#fff",
          borderRadius: "10px",
          border: "1px solid #7c3aed",
        }}
      />

      {/* Header */}
      <div className="max-w-6xl mt-24 mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          My Notes ✨
        </h1>

        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="px-4 py-2 rounded-full bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-500"
          />
          <button
            onClick={() => {
              setShowEditor(true);
              setTitle("");
              setContent("");
            }}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-medium hover:opacity-90 transition"
          >
            + Add Note
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 border border-purple-500 text-purple-400 rounded-full hover:bg-purple-500/10 transition"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Note Editor */}
      {showEditor && (
        <div className="max-w-6xl mx-auto bg-[#121212] border border-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full mb-4 px-4 py-3 text-lg font-semibold rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-500"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts..."
            rows={5}
            className="w-full px-4 py-4 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-500 resize-none"
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={saveNote}
              disabled={loading}
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setShowEditor(false);
                setTitle("");
                setContent("");
              }}
              className="px-5 py-2 border border-purple-500 text-purple-400 rounded-full hover:bg-purple-500/10 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="max-w-6xl mx-auto">
        {filteredNotes.length === 0 ? (
          <div className="bg-[#121212] p-8 rounded-2xl shadow text-center text-gray-400 border border-gray-800">
            <p>No notes yet — click “+ Add Note” to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-[#121212] border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/10 transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {note.title || "Untitled"}
                  </h3>
                  <p className="text-gray-400 whitespace-pre-line mb-4">
                    {note.content.length > 300
                      ? note.content.slice(0, 300) + "..."
                      : note.content}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                  <span>
                    {new Date(note.createdAt).toLocaleString("en-IN")}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="px-3 py-1 bg-red-600/80 hover:bg-red-700 rounded-full text-white text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 mt-10 text-sm">
        ✨ Notes saved in MongoDB | Dark gradient interface
      </div>
    </div>
  );
}
