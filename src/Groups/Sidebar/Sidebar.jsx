import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiMenu, FiX } from "react-icons/fi";
import { cn } from "../../lib/utils";
import { useDispatch } from "react-redux";
import { groupSidebar } from "@/Store/sidebarSlice";

const links = [
  { to: "/business/dashboard", label: "Dashboard", icon: <FiHome /> },
  { to: "/business/groups", label: "Groups", icon: <FiUsers /> },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    dispatch(groupSidebar(isOpen));
  }, [isOpen]);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full bg-gray-900 text-gray-100 flex flex-col shadow-lg transition-all duration-300 ease-in-out z-50",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950">
        {isOpen && (
          <h1 className="text-xl font-semibold tracking-wide text-white">
            INVESTMATE
          </h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pb-4">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 gap-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-800 hover:text-white",
                isActive ? "bg-gray-800 text-white" : "text-gray-400"
              )
            }
            title={!isOpen ? label : undefined}
          >
            <span className="text-lg">{icon}</span>
            {isOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer (optional) */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
        {isOpen && "© 2025 Investmate"}
      </div>
    </aside>
  );
}
