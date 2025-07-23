import { NavLink } from "react-router-dom";
import { FiHome, FiUsers } from "react-icons/fi";

const bottomLinks = [
  { to: "/business/dashboard", label: "Dashboard", icon: <FiHome /> },
  { to: "/business/groups", label: "Groups", icon: <FiUsers /> },
];

const BottomBar = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 shadow-md">
      <div className="flex justify-around items-center h-14">
        {bottomLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-colors ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`
            }
          >
            <div className="text-xl">{icon}</div>
            <span className="mt-0.5">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
