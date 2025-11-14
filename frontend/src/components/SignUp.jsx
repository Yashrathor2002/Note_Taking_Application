import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const BASE_URL = "https://note-taking-application-backend.vercel.app";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      console.log({ name, email, password });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      // store full user info + token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // notify navbar
      window.dispatchEvent(new Event("userChanged"));
      toast.success(`🎉 Signup successful! Welcome, ${data.user.name}!`);
      navigate("/notes");
    } catch (err) {
      toast.error(err?.message || "Signup failed");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#001F3F] via-[#002b5b] to-[#4f46e5] 
      relative overflow-hidden"
    >
      {/* Background glowing circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse delay-200"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md px-6 py-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        <h3 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-md">
          Create Your Account
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-200 mb-1">Name</label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-200 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-200 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 
              focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 
            text-white font-semibold text-lg shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-300"
          >
            Sign Up 🚀
          </button>
        </form>

        <p className="text-sm text-gray-300 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
