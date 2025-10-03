import {motion,AnimatePresence} from 'framer-motion'
import { fadeInUp } from '../constants/constant';
import { Code , Plus ,X, Loader} from 'lucide-react';
import { type ResumeData , type Skills } from '../interfaces/cvInterface';
import { memo , useState,useEffect  } from 'react';
import { useSelectorState,useAppDispatch } from '@/hooks/useReducerHooks';
import { generateSection,setGlobalError } from '@/slices/resumeReducer';



interface SkillProps{
    newSoftSkill:string,
    setNewSoftSkill:React.Dispatch<React.SetStateAction<string>>,
    newTechSkill:string,
    setNewTechSkill:React.Dispatch<React.SetStateAction<string>>,
    resumeData:ResumeData,
    addSkill:(type:'technical'|"soft",skill:string)=>void,
    removeSkill:(type:'technical'|'soft',index:number)=>void,
    setResumeData:React.Dispatch<React.SetStateAction<ResumeData>>

    }


const Skills = ({addSkill,newSoftSkill,newTechSkill,setNewSoftSkill,setNewTechSkill,resumeData,removeSkill}:SkillProps) => {
  const {jobDescription,isLoading,error,disabled}=useSelectorState((state)=>state.resumeState)

  const[softLocalSkill,setLocalSoftSkill]=useState<string>()
  const[techLocalSkill,setLocalTechSkill]=useState<string>()

  const dispatch=useAppDispatch()

  const handlLocalChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    if(name==="softSkills")
    setLocalSoftSkill(value)
    else setLocalTechSkill(value)
  
  }

  const generateSkills=async()=>{
    const response=await dispatch(generateSection({text:[...resumeData.skills.soft,...resumeData.skills.technical],jobDescription,type:'skills'})).unwrap()
    if (!response) {
    console.warn("Empty response from generateSection")
    return []
}
    const parsedSkill=JSON.parse(response.replace(/```json|```/g, ""))
    const skills=parsedSkill.skills
   
    skills.soft.forEach((skill:string)=>{
      addSkill('soft',skill)
    })
   skills.technical.forEach((skill:string)=>{
    addSkill('technical',skill)
   })}

    useEffect(()=>{
           if(error["skills"]){
                const timer = setTimeout(() => {
               dispatch(setGlobalError({type:'skills',value:''}))  // dispatch an action to reset error
           }, 2000)
           return () => clearTimeout(timer)
           }
         },[error['skills']])


  return (
   <motion.div
             initial="initial"
             animate="animate"
             variants={fadeInUp}
             transition={{ delay: 0.5 }}
           >
             <h3 className="font-semibold text-sm mb-2 flex items-center gap-1">
               <Code size={16} /> Skills
             </h3>
             
             {/* Technical Skills */}
             <div className="mb-3">
               <label className="block text-xs font-medium text-gray-600 mb-1">Technical Skills</label>
               <div className="flex gap-1 mb-1">
                 <input
                   type="text"
                   placeholder="Add technical skill"
                   value={techLocalSkill}
                   onChange={(e)=>{handlLocalChange(e)}}
                   onBlur={(e) => setNewTechSkill(e.target.value)}
                   onKeyPress={(e) => {
                     if (e.key === 'Enter') {
                       addSkill('technical', newTechSkill);
                     }
                   }}
                   className="border rounded p-1.5 text-xs flex-1 focus:ring-2 focus:ring-blue-400 transition-all"
                 />
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => addSkill('technical', newTechSkill)}
                   className="text-blue-500 hover:bg-blue-50 p-1.5 rounded"
                 >
                   <Plus size={14} />
                 </motion.button>
               </div>
               <div className="flex flex-row flex-wrap gap-1">
                 <AnimatePresence>
                   {resumeData.skills.technical.map((skill, i) => (
                     <motion.div
                       key={i}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: 0, opacity: 0 }}
                       whileHover={{ scale: 1.05 }}
                       className="bg-blue-100 text-blue-700 mt-5 mb-2 px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
                     >
                       {skill}
                       <motion.button
                         whileHover={{ scale: 1.2 }}
                         whileTap={{ scale: 0.8 }}
                         onClick={() => removeSkill('technical', i)}
                         className="hover:text-red-500"
                       >
                         <X size={10} />
                       </motion.button>
                     </motion.div>
                   ))}
                   
                 </AnimatePresence>
               </div>
             </div>
   
             {/* Soft Skills */}
             <div>
               <label className="block text-xs font-medium text-gray-600 mb-1">Soft Skills</label>
               <div className="flex  gap-1 mb-1">
                 <input
                   type="text"
                   name="softSkills"
                   placeholder="Add soft skill"
                   value={softLocalSkill}
                   onChange={(e)=>{handlLocalChange(e)}}
                   onBlur={(e) => setNewSoftSkill(e.target.value)}
                   onKeyPress={(e) => {
                     if (e.key === 'Enter') {
                       addSkill('soft', newSoftSkill);
                     }
                   }}
                   className="border rounded p-1.5 text-xs flex-1 focus:ring-2 focus:ring-blue-400 transition-all"
                 />
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => addSkill('soft', newSoftSkill)}
                   className="text-green-500 hover:bg-green-50 p-1.5 rounded"
                 >
                   <Plus size={14} />
                 </motion.button>
               </div>
               <div className="flex flex-row flex-wrap gap-1">
                 <AnimatePresence>
                   {resumeData.skills.soft.map((skill, i) => (
                     <motion.div
                       key={i}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: 0, opacity: 0 }}
                       whileHover={{ scale: 1.05 }}
                       className="bg-green-100  mt-5 mb-4  text-green-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
                     >
                       {skill}
                       <motion.button
                         whileHover={{ scale: 1.2 }}
                         whileTap={{ scale: 0.8 }}
                         onClick={() => removeSkill('soft', i)}
                         className="hover:text-red-500"
                       >
                         <X size={10} />
                       </motion.button>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
             </div>
             <button
            disabled={disabled}
            className=" px-3 py-2 text-white text-sm cursor-pointer font-medium 
             bg-gradient-to-r from-blue-500 to-blue-600 
             rounded-lg shadow-md 
             hover:from-blue-600 hover:to-blue-700 
             active:scale-95 
             transition-all duration-300 ease-in-out"
             onClick={generateSkills}
             >
             {!isLoading.skills? "Generate Skill Keywords Based on CV":(
              <p className='flex items-center flex-row gap-2 '>Generating Skills... <Loader className='animate-spin'/></p>
             )} </button>
             {error.skills && 
             
             <motion.p 
             initial={{opacity:0}}
             animate={{opacity:1}}
             className='errorMessage mt-3'>{error.skills}</motion.p>}

           </motion.div>
   
         
       
  )
}

export default memo(Skills)
