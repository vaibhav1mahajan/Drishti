import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-gray-950 text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-indigo-400">
          Contact Us
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Have queries, suggestions, or want to collaborate? Drop us a message and we’ll get back to you as soon as possible.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mx-auto bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl flex flex-col gap-6 shadow-lg"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="p-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="p-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
        ></textarea>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
}
