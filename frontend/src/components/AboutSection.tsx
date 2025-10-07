import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-indigo-400">
          About Us
        </h2>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
          We are a team of passionate data scientists and engineers building the future of automated technology forecasting. 
          Our mission is to empower organizations like DRDO with <span className="text-indigo-400 font-semibold">real-time, AI-driven insights</span> on emerging technologies, enabling smarter decisions and strategic innovation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto text-gray-400"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 flex-1 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2 text-indigo-400">Our Vision</h3>
          <p>To make technology intelligence accessible and actionable for organizations globally.</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 flex-1 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2 text-indigo-400">Our Approach</h3>
          <p>Leveraging AI, LLMs, and real-time data aggregation to deliver strategic insights on emerging technologies.</p>
        </div>
      </motion.div>
    </section>
  );
}
