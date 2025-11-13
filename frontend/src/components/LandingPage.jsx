import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function WelcomeMessage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-4 mt-24 relative z-10">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Note Making App
        </span>
      </h1>

      <p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
        Organize your thoughts, capture ideas, and stay productive — all in one
        sleek, secure space.
      </p>

      <button
        onClick={() => navigate("/signup")}
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
        text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-105"
      >
        Get Started 🚀
      </button>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col 
      bg-gradient-to-br from-[#001F3F] via-[#002b5b] to-[#004080] 
      relative overflow-hidden"
    >
      <Navbar />

      {/* subtle animated gradient circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-10 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse delay-200"></div>
      </div>

      <WelcomeMessage />
    </div>
  );
}
