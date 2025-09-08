import {motion} from 'framer-motion'
import { fadeInUp } from '../constants/constant'
import {Users} from 'lucide-react'
import { type ResumeData } from '../interfaces/cvInterface'

interface BasicInfo {
    resumeData:ResumeData
    handleChange:(field:keyof ResumeData,value:string)=>void
}

function BasicInfoSection({resumeData,handleChange}:BasicInfo) {
  return (
       <motion.div
             initial="initial"
             animate="animate"
             variants={fadeInUp}
             transition={{ delay: 0.1 }}
           >
             <h3 className="font-semibold mb-2 text-sm flex items-center gap-1">
               <Users size={16} /> Basic Info
             </h3>
             
             {["name", "email", "phone", "location", "linkedin"].map(
               (field, idx) => (
                 <motion.div 
                   key={field} 
                   className="mb-2"
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: idx * 0.05 }}
                 >
                   <label className="block text-xs font-medium capitalize text-gray-600">
                     {field}
                   </label>
                   <input
                     type="text"
                     value={resumeData[field as keyof ResumeData] as string}
                     onChange={(e) =>
                       handleChange(field as keyof ResumeData, e.target.value)
                     }
                     className="border rounded p-1.5 text-xs w-full focus:ring-2 focus:ring-blue-400 transition-all"
                   />
                   
                 </motion.div>
               )
             )}
             <motion.div 
               className="mb-2"
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.25 }}
             >
               <label className="block text-xs font-medium text-gray-600">Summary</label>
               <textarea
                 value={resumeData.summary}
                 onChange={(e) => handleChange("summary", e.target.value)}
                 className="border rounded p-1.5 text-xs w-full h-16 resize-none focus:ring-2 focus:ring-blue-400 transition-all"
               />
            <button
            className="mt-1 mb-4 px-3 py-2 text-white text-sm cursor-pointer font-medium 
             bg-gradient-to-r from-blue-500 to-blue-600 
             rounded-lg shadow-md 
             hover:from-blue-600 hover:to-blue-700 
             active:scale-95 
             transition-all duration-300 ease-in-out">
              Generate Professional Summary </button>
             </motion.div>
           </motion.div>
  )
}

export default BasicInfoSection
