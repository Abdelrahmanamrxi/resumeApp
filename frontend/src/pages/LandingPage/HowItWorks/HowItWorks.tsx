import { Briefcase, Wand2, Target, Rocket } from "lucide-react";
import {motion} from 'framer-motion'

const HowItWorks = () => {
    const steps = [
        {
          icon: <Briefcase className="w-10 h-10 text-blue-600" />,
          title: "Create Your Resume in Minutes",
          description: "Enter your details we format it instantly."
        },
        {
          icon: <Wand2 className="w-10 h-10 text-blue-600" />,
          title: "AI Analyzes & Improves",
          description: "Our AI reviews your resume and suggests improvements that get attention."
        },
        {
          icon: <Target className="w-10 h-10 text-blue-600" />,
          title: "Instant Job Matching",
          description: "Create a resume that attracts the jobs you want instantly."
        },
        {
          icon: <Rocket className="w-10 h-10 text-blue-600" />,
          title: "Apply & Get Hired",
          description: "Send your optimized resume and land more interviews."
        }
      ];
  return (
       <section className="py-16 w bg-gray-50">
      <div className=" mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid gap-8 items-center sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
