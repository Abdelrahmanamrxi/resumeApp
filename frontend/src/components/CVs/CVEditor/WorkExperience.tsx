
import {motion,AnimatePresence} from 'framer-motion'
import { fadeInUp,scaleIn } from '../constants/constant';
import { Briefcase,PlusCircle,Plus,X } from 'lucide-react';
import { type ResumeData,type ResumeDataArray } from '../interfaces/cvInterface';


interface WorkExperienceProps{
  addBulletPoint:(index:number)=>void,
  resumeData:ResumeData,
  addExperience:()=>void,
  removeExperience:(index:number)=>void,
  updateArrayItem:<T extends ResumeDataArray,K extends keyof ResumeData[T][number]>(section:T,index:number,key:K,value:ResumeData[T][number][K])=>void,
  removeBulletPoint:(index:number,pointIndex:number)=>void
}
function WorkExperience({addBulletPoint,resumeData,addExperience,removeExperience,updateArrayItem,removeBulletPoint}:WorkExperienceProps) {
   
  return (
       <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-sm flex items-center gap-1">
              <Briefcase size={16} /> Work Experience
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addExperience}
              className="text-blue-500 flex items-center gap-1 text-xs hover:bg-blue-50 px-2 py-1 rounded transition-all"
            >
              <PlusCircle size={14} /> Add
            </motion.button>
          </div>
          <AnimatePresence>
            {resumeData.experiences.map((exp, i) => (
              <motion.div
                key={i}
                layout
                initial="initial"
                animate="animate"
                exit="exit"
                variants={scaleIn}
                transition={{ duration: 0.3 }}
                className="border rounded p-6 mb-2 space-y-1.5 relative bg-gradient-to-r from-blue-50 to-white"
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeExperience(i)}
                  className="absolute top-1 right-1 text-red-500 hover:bg-red-50 p-1 rounded"
                >
                  <X size={14} />
                </motion.button>
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) =>
                    updateArrayItem("experiences", i, "jobTitle", e.target.value)
                  }
                  className="border rounded p-1.5 text-xs w-full focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <input
                  type="text"
                  placeholder="Company "
                  value={exp.company}
                  onChange={(e) =>
                    updateArrayItem("experiences", i, "company", e.target.value)
                  }
                  className="border rounded p-1.5 text-xs w-full focus:ring-2 focus:ring-blue-400 transition-all"
                />
                
                <div className="space-y-1">
                  <AnimatePresence>
                    {exp.points.map((point, pi) => (
                      <motion.div
                        key={pi}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex gap-1"
                      >
                        <input
                          type="text"
                          placeholder="Bullet Point"
                          value={point}
                          onChange={(e) => {
                            const updatedPoints = [...exp.points];
                            updatedPoints[pi] = e.target.value;
                            updateArrayItem("experiences", i, "points", updatedPoints);
                          }}
                          className="border rounded p-1.5 text-xs flex-1 focus:ring-2 focus:ring-blue-400 transition-all"
                        />
                        {exp.points.length > 1 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeBulletPoint(i, pi)}
                            className="text-red-500 hover:bg-red-50 p-1 rounded"
                          >
                            <X size={12} />
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addBulletPoint(i)}
                    className="text-blue-500 flex mt-5 items-center gap-1 text-xs hover:bg-blue-50 px-2 py-1 rounded w-full justify-center border border-dashed border-blue-300"
                  >
                    <Plus size={12} /> Add Bullet Point
                  </motion.button>
                  <div className='flex  flex-col'>

                  <div className='flex justify-between gap-2 flex-row'>
                  <div className='flex flex-col w-1/2'>

                  <label className='text-gray-600 mt-2 text-xs mb-2'>From:</label>
                  <input
                  type="Date"
                  placeholder="From"
                  value={exp.from ? new Date(exp.from).toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    updateArrayItem("experiences", i, "from", new Date(e.target.value))
                  }
                  className="border rounded p-1.5 text-xs   focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  </div>
                  <div className='flex flex-col w-1/2'>

                  <label className='text-gray-600 mt-2 text-xs mb-2'>To:</label>
                  <input
                  type="Date"
                  placeholder="From"
                  value={exp.To ? new Date(exp.To).toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    updateArrayItem("experiences", i, "To", new Date(e.target.value))
                  }
                  className="border rounded p-1.5 text-xs   focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  </div>
                  </div>
                  <button
            className="mt-5 px-3 py-2 text-white text-sm cursor-pointer font-medium 
             bg-gradient-to-r from-blue-500 to-blue-600 
             rounded-lg shadow-md 
             hover:from-blue-600 hover:to-blue-700 
             active:scale-95 
             transition-all duration-300 ease-in-out"
>
  Generate AI Response
</button>
  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
  )
}

export default WorkExperience
