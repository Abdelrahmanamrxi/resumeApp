import hero from '../../../assets/resumeTemplate.png'
import { Button } from '@/components/ui/button'
import {motion} from 'framer-motion'
import { useEffect,useState } from 'react'
const Hero = () => {
     const text:string = "Build Your Perfect Resume — Powered by AI";
    
      const [index, setIndex] = useState(0);
      useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);


  return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16  px-6 py-12">
  
  {/* Text Content */}
  <div className="flex flex-col w-full lg:w-1/2">
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="lg:text-6xl text-4xl font-extrabold font-sans text-gray-900 leading-tight"
    >
      {text.slice(0, index)} <span className="animate-pulse">|</span>
    </motion.h1>

    <motion.h2
      className="mt-5 text-xl font-medium text-blue-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      Create. Analyze. Match. Get Hired.
    </motion.h2>

    <motion.p
      className="mt-4 text-lg font-normal text-gray-700 font-sans"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      Our AI builds a professional, ATS‑friendly resume for you, analyzes it for improvements, and matches it to the jobs you want — all in minutes.
    </motion.p>

    <motion.div
      className="mt-6 flex flex-col sm:flex-row gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <Button className="font-bold px-5 font-sans py-4 text-base">
        Start building my Resume
      </Button>
      <Button variant="secondary" className="px-6 py-3 text-base">
        See How It Works
      </Button>
    </motion.div>
  </div>

  {/* Image */}

  <motion.img
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="w-full lg:w-1/2 max-w-md lg:max-w-full object-contain"
    src={hero}
    alt="AI Resume Builder Preview"
  />
</div>

  )
}

export default Hero
