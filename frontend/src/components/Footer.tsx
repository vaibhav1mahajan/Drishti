import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-400 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">DrishtiAI</h3>
          <p className="text-gray-400 text-sm">
            AI-powered platform that aggregates patents, publications, and industry data to forecast emerging technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2">
            {["home", "features", "howWeWork", "about", "contact"].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="/login" className="hover:text-indigo-400 transition cursor-pointer">Login</a>
            </li>
            <li>
              <a href="/signup" className="hover:text-indigo-400 transition cursor-pointer">Signup</a>
            </li>
            <li>
              <a href="/forgot-password" className="hover:text-indigo-400 transition cursor-pointer">Forgot Password</a>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Connect with Us</h3>
          <div className="flex gap-4 mb-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <FaGithub size={20} />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DrishtiAI — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
