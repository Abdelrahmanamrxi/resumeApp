import { Briefcase, Wand2, Target, Rocket } from "lucide-react";
import {motion} from 'framer-motion'



const steps = [
  {
    icon: <Briefcase className="w-12 h-12 " />,
    title: "Build Your Resume",
    description: "Craft a polished resume in minutes with our smart builder.",
  },
  {
    icon: <Wand2 className="w-12 h-12" />,
    title: "AI Optimization",
    description: "Get instant AI-powered feedback and keyword suggestions.",
  },
  {
    icon: <Target className="w-12 h-12 " />,
    title: "Tailored Job Matches",
    description: "Find opportunities that align with your skills automatically.",
  },
  {
    icon: <Rocket className="w-12 h-12" />,
    title: "Apply & Succeed",
    description: "Send optimized resumes and boost your chances to get hired.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HowItWorks = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Background Accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 via-white to-blue-100 opacity-60 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          className="text-4xl font-extrabold  mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>

        {/* Steps Grid */}
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              {/* Icon with animated glow */}
              <div className="relative mb-5">
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-200 blur-xl opacity-60"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                {step.title}
              </h3>
              <p className="text-blue-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
