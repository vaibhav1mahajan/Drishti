import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email} (mock)`); // Replace with real logic
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-950 text-white px-4">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Forgot Password
      </motion.h1>

      <motion.form
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-900 p-6 rounded-xl w-full max-w-md flex flex-col gap-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 bg-gray-800 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 py-2 rounded-md font-semibold transition"
        >
          Send Reset Link
        </motion.button>

        <p className="text-gray-400 text-sm mt-2 text-center">
          Remember your password?{" "}
          <span
            className="text-indigo-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </motion.form>
    </div>
  );
};

export default ForgotPassword;
