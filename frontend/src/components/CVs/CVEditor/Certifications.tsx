import { fadeInUp,scaleIn } from "../constants/constant"
import {motion,AnimatePresence} from 'framer-motion'
import { Award,PlusCircle,X } from "lucide-react"
import type { ResumeData, ResumeDataArray,  Certification } from "../interfaces/cvInterface"
import React, { useState } from "react"

    interface CertificationProps{
        addCertification:()=>void,
        resumeData:ResumeData,
        removeCertification:(i:number)=>void
        updateArrayItem:<T extends ResumeDataArray, K extends keyof ResumeData[T][number]>
        (section:T,index:number,key:K,value:ResumeData[T][number][K])
        =>void
    }

    
function Certifications({addCertification,resumeData,removeCertification,updateArrayItem}:CertificationProps) {
    const[localCerti,setCerti]=useState<Certification[]>(resumeData.certifications?? [])
    
    const handleLocalChange=(e:React.ChangeEvent<HTMLInputElement>,i:number)=>{
      const {name,value}=e.target
      setCerti(prev=>prev.map((cert,index)=>{
        if(index===i)
        return {...cert,[name]:value}
        else return cert
      }))
    }
    
  return (
      <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-sm flex items-center gap-1">
                <Award size={16} /> Certifications
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addCertification}
                className="text-blue-500 flex items-center gap-1 text-xs hover:bg-blue-50 px-2 py-1 rounded transition-all"
              >
                <PlusCircle size={14} /> Add
              </motion.button>
            </div>
            <AnimatePresence>
              {resumeData.certifications.map((cert, i) => (
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
                    onClick={() => removeCertification(i)}
                    className="absolute top-1 right-1 text-red-500 hover:bg-red-50 p-1 rounded"
                  >
                    <X size={14} />
                  </motion.button>
                  <input
                    name="title"
                    type="text"
                    placeholder="Certification Title"
                    value={localCerti[i]?.title}
                    onChange={(e)=>{handleLocalChange(e,i)}}
                    onBlur={(e) =>
                      updateArrayItem("certifications", i, "title", e.target.value)
                    }
                    className="border rounded p-1.5 text-xs w-full focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  <input
                    type="text"
                    name="issuer"
                    placeholder="Issuer"
                    value={localCerti[i]?.issuer}
                    onChange={(e)=>{handleLocalChange(e,i)}}
                    onBlur={(e) =>
                      updateArrayItem("certifications", i, "issuer", e.target.value)
                    }
                    className="border rounded p-1.5 text-xs w-full focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  <input
                    type="Date"
                    name="year"
                    placeholder="Year"
                    value={cert.year?new Date(cert.year).toISOString().split('T')[0]:""}
                    onChange={(e) =>
                      updateArrayItem("certifications", i, "year", new Date(e.target.value))
                    }
                    className="border rounded p-1.5 text-xs w-full focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
  
  )
}

export default React.memo(Certifications)
