import {motion} from 'framer-motion'
import { fadeInUp } from '../constants/constant'
import {Users,Loader} from 'lucide-react'
import { type ResumeData } from '../interfaces/cvInterface'
import React, { useEffect, useState } from 'react'
import { useAppDispatch , useSelectorState } from '@/hooks/useReducerHooks'
import { generateSection, setGlobalError } from '@/slices/resumeReducer'


interface BasicInfo {
    resumeData:ResumeData
    handleChange:(field:keyof ResumeData,value:string)=>void
}
interface LocalInfo {
  name: string
  email: string
  phone: string
  linkedin: string
  location: string,
  summary:string
}


function BasicInfoSection({resumeData,handleChange}:BasicInfo) {
  const {isLoading,disabled,error,jobDescription}=useSelectorState((state)=>state.resumeState)
  const dispatch=useAppDispatch()

  const[basicInfo,setInfo]=useState<LocalInfo>({
    name:resumeData.name,
    email:resumeData.email,
    phone:resumeData.phone,
    linkedin:resumeData.linkedin,
    location:resumeData.location,
    summary:resumeData.summary
  })
  const handleLocalChange=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {value,name}=e.target
    setInfo((prev)=>{
      return {...prev,[name]:value}
    })
  }

  const generateSummary=async()=>{
   const response=await dispatch(generateSection({jobDescription,text:basicInfo.summary,type:'summary'})).unwrap()
   setInfo((prev)=>{
    return {...prev,summary:response}
   })
  }
  
  useEffect(()=>{
    if(error["summary"]){
         const timer = setTimeout(() => {
        dispatch(setGlobalError({type:'summary',value:''}))  // dispatch an action to reset error
    }, 2000)
    return () => clearTimeout(timer)
    }
  },[error['summary']])

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
                     name={field}
                     type="text"
                     value={basicInfo[field as keyof LocalInfo]}
                     onChange={handleLocalChange}
                     onBlur={(e)=>{handleChange(field as keyof ResumeData,e.target.value)}}
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
                 name="summary"
                 value={basicInfo?.summary}
                 onChange={(e)=>{handleLocalChange(e)}}
                 onBlur={(e) => handleChange("summary", e.target.value)}
                 className="border rounded p-1.5 text-xs w-full h-16 resize-none focus:ring-2 focus:ring-blue-400 transition-all"
               />
            <button
            disabled={disabled}
            onClick={generateSummary}
            className="mt-3 mb-4 px-3 py-2 text-white text-sm cursor-pointer font-medium 
             bg-gradient-to-r from-blue-500 to-blue-600 
             rounded-lg shadow-md 
             hover:from-blue-600 hover:to-blue-700 
             active:scale-95 
             transition-all duration-300 ease-in-out">
              {!isLoading.summary?"Generate Professional Summary":(
                <p className='flex flex-row gap-2 items-center'>Generating.. <Loader className='animate-spin'/></p>
              )} </button>
             {error['summary'] &&
             <motion.p 
             initial={{opacity:0 }}
             animate={{opacity:1}}
             
             className='errorMessage'>{error.summary}</motion.p>}
             </motion.div>
           </motion.div>
           
  )
}

export default BasicInfoSection
