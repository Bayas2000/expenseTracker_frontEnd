// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers } from "react-icons/fi";

const links = [
  { to: "/business/dashboard", label: "Dashboard", icon: <FiHome /> },
  { to: "/business/groups", label: "Groups", icon: <FiUsers /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-gray-100 flex flex-col">
      <div className="p-6 text-2xl font-bold">INVESTMATE</div>
      <nav className="flex-1">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <span className="text-xl mr-3">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
