import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient to-white">
      <header className="bg-gradient-to-r from-funky-300 to-funky-500 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-yellow-700 font-extrabold text-lg md:text-2xl retro-glow">🎉 Chandru's Diwali</h1>
          <nav className="space-x-2 text-sm md:text-base">
            <NavLink to="/" end className={({isActive})=>`px-3 py-1 rounded ${isActive ? "bg-white/20" : "hover:bg-white/10"}`}>Jackpot</NavLink>
            <NavLink to="/gallery" className={({isActive})=>`px-3 py-1 rounded ${isActive ? "bg-white/20" : "hover:bg-white/10"}`}>Gallery</NavLink>
            <NavLink to="/cake" className={({isActive})=>`px-3 py-1 rounded ${isActive ? "bg-white/20" : "hover:bg-white/10"}`}>Celebration</NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>

      <footer className="text-center py-4 text-sm text-gray-600">
        Made with ❤️ <br /> From Heidelberg Gowda, Kunni Leone, Krupakar, Rahul, Shyam, Vivek & DBOSS
      </footer>
    </div>
  );
}
