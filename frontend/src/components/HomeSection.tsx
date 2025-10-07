import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomeSection() {
  const navigate = useNavigate();

  // Function to scroll smoothly to features section
  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6"
    >
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
      >
        Transforming <span className="text-indigo-400">Technology Intelligence</span>
        <br />
        into Real-Time Strategic Insights
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-2xl text-gray-400 mb-10 text-lg md:text-xl"
      >
        An AI-powered platform that aggregates patents, publications, and industry data to forecast emerging technologies.
      </motion.p>

      {/* Explore Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/signup")}
        className="bg-indigo-500 hover:bg-indigo-600 px-8 py-4 rounded-xl text-lg md:text-xl font-semibold shadow-lg shadow-indigo-500/30 transition mb-10"
      >
        Explore DrishtiAI
      </motion.button>

      {/* Scroll Arrow */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="cursor-pointer"
        onClick={scrollToFeatures}
      >
        <svg
          className="w-8 h-8 text-indigo-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
