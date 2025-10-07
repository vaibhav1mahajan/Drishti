import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaMicrosoft } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSocialSignup = (provider: string) => {
    alert(`Signing up with ${provider} (mock)`); // Replace with real OAuth
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-950 text-white px-4 relative">
      {/* Back to Home Button */}
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-indigo-400 hover:text-white transition font-semibold"
      >
        <ArrowLeft size={20} />
        Back to Home
      </motion.button>

      {/* Animated Heading */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Create Your Account
      </motion.h1>

      {/* Form */}
      <motion.form
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-900 p-6 rounded-xl w-full max-w-md flex flex-col gap-4 shadow-lg"
      >
        <input
          type="text"
          placeholder="Name"
          className="p-3 bg-gray-800 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 bg-gray-800 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 bg-gray-800 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="p-3 bg-gray-800 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/dashboard");
          }}
          className="bg-indigo-500 hover:bg-indigo-600 py-2 rounded-md font-semibold transition"
        >
          Signup
        </motion.button>

        {/* Divider */}
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <span className="flex-1 border-b border-gray-700 mr-2 mt-2"></span>
          <span>or continue with</span>
          <span className="flex-1 border-b border-gray-700 ml-2 mt-2"></span>
        </div>

        {/* Social Signup Buttons */}
        <div className="flex flex-col gap-3 mt-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSocialSignup("Google")}
            className="flex items-center justify-center gap-2 bg-white text-black py-2 rounded-md font-semibold transition"
          >
            <FcGoogle size={18} />
            Continue with Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSocialSignup("Microsoft")}
            className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 py-2 rounded-md font-semibold transition"
          >
            <FaMicrosoft size={18} />
            Continue with Microsoft
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSocialSignup("GitHub")}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-2 rounded-md font-semibold transition"
          >
            <FaGithub size={18} />
            Continue with GitHub
          </motion.button>
        </div>
      </motion.form>

      {/* Login Link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 text-sm mt-4 text-center"
      >
        Already have an account?{" "}
        <span
          className="text-indigo-400 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </motion.p>
    </div>
  );
};

export default Signup;
