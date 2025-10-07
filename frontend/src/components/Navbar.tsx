import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Function for smooth scrolling
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false); // Close mobile menu
  };

  return (
    <nav className="fixed w-full bg-gray-950/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-indigo-400 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/"); // Optional: ensure landing page
          }}
        >
          DrishtiAI
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {["Home", "Features", "How We Work", "About", "Contact"].map((item) => (
            <span
              key={item}
              onClick={() => handleScroll(item.toLowerCase().replace(/\s/g, ""))}
              className="hover:text-indigo-400 transition cursor-pointer"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-md border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition cursor-pointer"
          >
            Signup
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-900 text-white flex flex-col gap-4 py-4 px-6">
          {["Home", "Features", "How We Work", "About", "Contact"].map((item) => (
            <span
              key={item}
              onClick={() => handleScroll(item.toLowerCase().replace(/\s/g, ""))}
              className="cursor-pointer hover:text-indigo-400 transition"
            >
              {item}
            </span>
          ))}
          <button
            onClick={() => navigate("/login")}
            className="mt-2 text-indigo-400 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-400 cursor-pointer"
          >
            Signup
          </button>
        </div>
      )}
    </nav>
  );
}
