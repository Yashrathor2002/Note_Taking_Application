import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // ✅ Load user from localStorage immediately (no flicker)
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleUserChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // ✅ Listen for login/logout updates across tabs or events
    window.addEventListener("userChanged", handleUserChange);
    window.addEventListener("storage", handleUserChange);

    return () => {
      window.removeEventListener("userChanged", handleUserChange);
      window.removeEventListener("storage", handleUserChange);
    };
  }, []);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 
      bg-gradient-to-r from-[#001F3F] via-[#003366] to-[#004080]
      shadow-lg backdrop-blur-sm border-b border-blue-900/50 z-50"
    >
      {/* Left: Logo */}
      <div
        className="text-white text-2xl font-extrabold tracking-wide cursor-pointer hover:opacity-90 transition"
        onClick={() => navigate("/")}
      >
        📝 Note Making
      </div>

      {/* Right: Buttons */}
      <div className="space-x-4 flex items-center">
        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 bg-white/90 text-blue-800 font-semibold rounded-lg hover:bg-white transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <span className="text-white font-medium text-lg">
              Hello, {user.name || "User"} 👋
            </span>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
