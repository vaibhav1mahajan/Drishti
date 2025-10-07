import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Database,
  BarChart,
  Zap,
  Lightbulb,
  Settings,
  LogOut,
  Check,
  X,
  Menu,
  ChevronLeft
} from "lucide-react";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const links = [
    { to: "/dashboard", label: "Home", icon: <Home size={20} /> },
    { to: "/dashboard/data", label: "Data Integration", icon: <Database size={20} /> },
    { to: "/dashboard/analytics", label: "Analytics", icon: <BarChart size={20} /> },
    { to: "/dashboard/forecasting", label: "Forecasting", icon: <Zap size={20} /> },
    { to: "/dashboard/insights", label: "Insights", icon: <Lightbulb size={20} /> },
    { to: "/dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    navigate("/"); // Redirect to landing page
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        animate={{ width: isCollapsed ? 72 : 256 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        className="bg-gray-900 min-h-screen flex flex-col justify-between p-4 relative"
      >
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 right-[-12px] p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-md"
        >
          {isCollapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Top Links */}
        <div className="flex flex-col gap-3 mt-10">
          <AnimatePresence>
            {links.map(({ to, label, icon }) => (
              <NavLink key={to} to={to} end>
                {({ isActive }) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${isActive
                      ? "bg-blue-800 text-white shadow-md"
                      : "text-gray-400 hover:bg-blue-600 hover:text-white"}`}
                  >
                    {icon}
                    {!isCollapsed && <span className="truncate">{label}</span>}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </AnimatePresence>
        </div>

        {/* Logout Button */}
        <div className="mt-auto">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-200 w-full"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 rounded-lg p-6 w-80 text-center text-white shadow-lg"
            >
              <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
              <p className="mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold transition"
                >
                  <Check size={16} /> Yes
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md font-semibold transition"
                >
                  <X size={16} /> No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
