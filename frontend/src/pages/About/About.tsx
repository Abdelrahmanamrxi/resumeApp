import React, { useState, useEffect } from 'react';
import { CheckCircle, FileText, BarChart3, Zap, Target, Shield, Users, Sparkles, ArrowRight, Star, TrendingUp, Brain } from 'lucide-react';
import Header from '@/components/layout/Header/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/layout/Footer/Footer';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countedStats, setCountedStats] = useState({ resumes: 0, users: 0, success: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    // Animate statistics
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCountedStats({
        resumes: Math.floor(1000 * progress),
        users: Math.floor(100 * progress),
        success: Math.floor(94 * progress)
      });

      if (currentStep >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your resume against job descriptions to maximize match rates"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "ATS Optimization",
      description: "Beat applicant tracking systems with perfectly formatted, keyword-optimized resumes"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Templates",
      description: "Professional, ATS-friendly templates that make your experience shine"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Scoring",
      description: "Get real-time feedback and actionable improvements for your resume"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Experience Generator",
      description: "Transform job descriptions into compelling work experience bullet points"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your data is encrypted and never shared. Your career journey stays confidential"
    }
  ];

  const stats = [
    { value: countedStats.resumes.toLocaleString(), label: "Resumes Optimized", suffix: "+" },
    { value: countedStats.users.toLocaleString(), label: "Happy Users", suffix: "+" },
    { value: countedStats.success, label: "Success Rate", suffix: "%" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      content: "Landed my dream job at a FAANG company. The ATS optimization made all the difference!",
      rating: 5
    },
    {
      name: "Michael Roberts",
      role: "Marketing Director",
      content: "The AI suggestions transformed my resume. Went from zero callbacks to 5 interviews in two weeks.",
      rating: 5
    },
    {
      name: "Emily Martinez",
      role: "Data Analyst",
      content: "The experience generator saved me hours. It perfectly captured my skills in industry language.",
      rating: 5
    }
  ];

  // Framer motion variants
  const containerStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.56, ease: 'easeOut' } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const cardHover = {
    whileHover: { y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <motion.section
        className={`relative py-24 px-6 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent animate-gradient"
            initial={{ opacity: 0, y: 8 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            We're Revolutionizing Job Applications
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-800 mb-8 font-sans leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
          >
            Your resume is your story. We help you tell it perfectly, every single time.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ delay: 0.32, type: 'spring', stiffness: 260, damping: 24 }}
          >
            <button onClick={() => { navigate('/user/dashboard'); }} className="px-8 py-4 bg-gradient-to-r from-blue-400 cursor-pointer via-blue-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Start Optimizing <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerStagger}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`text-center transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              variants={fadeUp}
            >
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-600 mt-2 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Mission Section */}
      <motion.section
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe everyone deserves a fair shot at their dream job. Traditional resumes fail 75% of the time before human eyes even see them. We're here to change that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" variants={fadeIn}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Beat the Bots</h3>
                  <p className="text-gray-600">Our AI understands exactly what ATS systems look for and optimizes accordingly.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
                  <p className="text-gray-600">Every suggestion is backed by analysis of millions of successful applications.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Human Touch</h3>
                  <p className="text-gray-600">AI-powered but human-centered. Your unique story always shines through.</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl opacity-10 blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold">94% Success Rate</span>
                  </div>
                  <div className="text-3xl font-bold">Your Career, Amplified</div>
                  <p className="text-gray-600">
                    We don't just optimize resumes. We unlock opportunities, open doors, and accelerate careers.
                  </p>
                  <div className="pt-4">
                    <div className="flex -space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 border-2 border-white"></div>
                      ))}
                      <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-semibold">
                        +100
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">Join thousands getting hired at top companies</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        variants={containerStagger}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600">Powerful features that give you the edge in your job search</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 rounded-2xl border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                variants={fadeUp}
                whileHover={cardHover.whileHover}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        variants={containerStagger}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600">Real people, real results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-xl transition-all duration-300"
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <Footer />
    </div>
  );
};

export default About;
