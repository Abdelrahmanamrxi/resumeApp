
import Counter from '../../../utils/Counter'
import {motion} from 'framer-motion'
const SocialProof = () => {
    const stats = [
    { value: 10000, label: "Resumes Built" },
    { value: 5000, label: "AI Improvements Made" },
    { value: 90, label: "Got Interviews (%)" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h3
          className="text-3xl font-bold text-gray-900 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted by Job Seekers Worldwide
        </motion.h3>

        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="p-6   transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <p className="text-4xl font-bold text-blue-600">
                <Counter end={stat.value} duration={2000} />
                {stat.label.includes("%") ? "%" : "+"}
              </p>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProof
