
import { FileCheck, SearchCheck, Zap, Download } from "lucide-react"; // Example icons
import { motion } from 'framer-motion'
function WhyChoseUs() {
    const features = [
    {
      icon: <FileCheck className="w-10 h-10 text-blue-600" />,
      title: "ATS‑Friendly Formatting",
      description: "Pass recruiter screening software and get your resume seen."
    },
    {
      icon: <SearchCheck className="w-10 h-10 text-blue-600" />,
      title: "Smart AI Matching",
      description: "Tailor your Resume specifically to your dreeam job."
    },
    {
      icon: <Zap className="w-10 h-10 text-blue-600" />,
      title: "Instant Feedback",
      description: "Improve your resume in seconds with AI‑powered suggestions."
    },
    {
      icon: <Download className="w-10 h-10 text-blue-600" />,
      title: "Export Anywhere",
      description: "Download in PDF, Word, or export to LinkedIn instantly."
    }
  ];
  return (
   <section className="mt-5 py-20">
  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-32 h-32 bg-blue-200 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
  <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
    <div className="flex flex-col items-center mb-6">
      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-2">
        <Zap className="w-7 h-7 text-blue-600" />
      </span>
      <motion.h4
        className="text-3xl font-bold text-gray-900 text-center mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Why Job Seekers Choose Us
      </motion.h4>
      <p className="text-blue-700 text-base text-center max-w-xl">
        Discover the features that set us apart and help you land your dream job faster.
      </p>
    </div>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border-2 ${
            i === 1 ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          {i === 1 && (
            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
              Most Popular
            </span>
          )}
          {feature.icon}
          <h3 className="mt-4 font-semibold text-lg text-gray-900">
            {feature.title}
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
  )
}

export default WhyChoseUs
