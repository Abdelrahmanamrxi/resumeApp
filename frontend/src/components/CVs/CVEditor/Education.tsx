
import {motion,AnimatePresence} from 'framer-motion'
import { GraduationCap,PlusCircle,X } from 'lucide-react'
import {fadeInUp,scaleIn } from '../constants/constant'
import type { ResumeData,ResumeDataArray, Education } from '../interfaces/cvInterface'
import  type React  from 'react'
import { useState,memo } from 'react'
  interface EducationProps{
     addEducation:()=>void,
     resumeData:ResumeData,
     removeEducation:(index:number)=>void,
     updateArrayItem:<T extends ResumeDataArray,K extends keyof ResumeData[T][number]>
     (section:T,index:number,key:K,value:ResumeData[T][number][K])=>void,
}


function Education({addEducation,resumeData,removeEducation,updateArrayItem}:EducationProps) {
  const[localEdu,setEdu]=useState<Education[]>(resumeData.education)

  const handleLocalChange=(e:React.ChangeEvent<HTMLInputElement>,index:number)=>{
    const {name,value}=e.target
    setEdu(prev=>prev.map((edu,i)=>{
      if(i===index)
      return {...edu,[name]:value}
      else return edu
    }))
  }
  return (
      <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-sm flex items-center gap-1">
                <GraduationCap size={16} /> Education
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addEducation}
                className="text-blue-500 flex items-center gap-1 text-xs hover:bg-blue-50 px-2 py-1 rounded transition-all"
              >
                <PlusCircle size={14} /> Add
              </motion.button>
            </div>
            <AnimatePresence>
              {resumeData.education.map((edu, i) => (
                <motion.div
                  key={i}
                  layout
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={scaleIn}
                  transition={{ duration: 0.3 }}
                  className="border rounded p-6 mb-2 space-y-1.5 relative bg-gradient-to-r from-green-50 to-white"
                >
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeEducation(i)}
                    className="absolute top-1 right-1 text-red-500 hover:bg-red-50 p-1 rounded"
                  >
                    <X size={14} />
                  </motion.button>
                  <input
                    type="text"
                    name="degree"
                    placeholder="Degree"
                    value={localEdu[i]?.degree}
                    onChange={(e)=>{handleLocalChange(e,i)}}
                    onBlur={(e) =>
                      updateArrayItem("education", i, "degree", e.target.value)
                    }
                    className="border rounded p-1.5 text-xs w-full focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  <input
                    type="text"
                    name='institution'
                    placeholder="Institution"
                    value={localEdu[i]?.institution}
                    onChange={(e)=>{handleLocalChange(e,i)}}
                    onBlur={(e) =>
                      updateArrayItem("education", i, "institution", e.target.value)
                    }
                    className="border rounded p-1.5 text-xs w-full focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  <div className='flex flex-row gap-2 justify-between'>
                    <div className='flex flex-col w-1/2'>
                    <label className='text-gray-600 mt-2 text-xs mb-2'>From:</label>
                  <input
                    type='date'
                    name="from"
                    placeholder="From"
                    value={edu.from ? new Date(edu.from).toISOString().split("T")[0] : ""}
                    onChange={(e) =>
                      updateArrayItem("education", i, "from", new Date(e.target.value))
                    }
                    className="border rounded p-1.5 text-xs  focus:ring-2 focus:ring-blue-400 transition-all"
                    />
                    </div>
                  <div className='flex flex-col w-1/2'>
                    <label className='text-gray-600 mt-2 text-xs mb-2'>To:</label>
                  <input
                    type='date'
                    name="To"
                    placeholder="To"
                    value={edu.To ? new Date(edu.To).toISOString().split("T")[0] : ""}
                    onChange={(e) =>
                      updateArrayItem("education", i, "from", new Date(e.target.value))
                    }
                    className="border rounded p-1.5 text-xs  focus:ring-2 focus:ring-blue-400 transition-all"
                    />
                    </div>
                    </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
  )
}

export default memo(Education)
