import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HowItWorksSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const steps = [
    { num: "01", title: "Data Collection", desc: "Automatically collects data from global patent and research databases." },
    { num: "02", title: "AI Processing", desc: "LLMs analyze technology evolution, readiness, and emerging signals." },
    { num: "03", title: "Forecast Generation", desc: "Creates S-Curve, Hype Curve, and TRL progression visualizations." },
    { num: "04", title: "Insight Delivery", desc: "Provides strategic intelligence via dashboard and reports." },
    { num: "05", title: "Dashboard Visualization", desc: "Interactive charts, graphs, and heatmaps for clear understanding of trends." },
    { num: "06", title: "Strategic Recommendations", desc: "Actionable recommendations for R&D and business decision-making." },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 }
    })
  };

  return (
    <section
      id="howwework"
      className="py-20 bg-gray-950 text-white px-6"
      ref={ref}
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          hidden: { opacity: 0, y: 50 }
        }}
        className="text-3xl md:text-4xl font-bold text-center mb-16"
      >
        How We Work
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative">
        {steps.map((s, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            className={`relative bg-gray-900 p-6 rounded-2xl shadow-lg border border-indigo-700`}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white font-bold mb-4">
              {s.num}
            </div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-400 text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
