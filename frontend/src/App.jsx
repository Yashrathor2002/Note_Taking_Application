import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NotesDashboard from "./components/NotesDashBoard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/notes" element={<NotesDashboard />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </BrowserRouter>
  );
}
