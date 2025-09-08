
import  type React from "react"
import {motion , AnimatePresence} from 'framer-motion'
import { useState } from "react"
import api from "@/middleware/interceptor"
import { defaultData } from "../constants/constant"
import { LoaderCircle } from "lucide-react"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import type { ResumeType } from "../interfaces/cvInterface"

type SelectionProps={
    id:ResumeType,
    title:string,
    setTemplate:React.Dispatch<React.SetStateAction<{id:ResumeType,title:string,src:string}|null>>
}

function CVSelection({id,title,setTemplate}:SelectionProps):React.JSX.Element {
      const[error,setError]=useState<string>('')
      const navigate=useNavigate()
      const[isLoading,setLoading]=useState<boolean>(false)
      const[resumeName,setName]=useState<string>('')

      const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError('')
        setLoading(true)
        try{
            defaultData["resumeName"]=resumeName
            defaultData['resumeType']=id
           
            const response=await api.post('/resume',defaultData)
            const{resumeId,resumeType}=response.data as {resumeId:string,resumeName:string,resumeType:string}
            setLoading(false)
            navigate(`/user/dashboard/resume/${resumeId}?resumeType=${resumeType}&resumeName=${resumeName}`)
        }
        catch(err){
            if(err instanceof AxiosError){
                setError(err.response?.data.message)
                setLoading(false)
            }
        }

    }
    
  return (
   <AnimatePresence mode="wait">
    <motion.div
      key={id}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg w-full m-4 md:m-0 shadow-xl p-6 md:w-full max-w-lg relative"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setTemplate(null)}
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4">{title} Template</h3>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            
        <label className="block text-base font-medium text-gray-600">
          Start by typing your resume name
        </label>
        {error&&<p className="errorResults">{error}</p>}
        <input
          type="text"
          onChange={(e)=>{setName(e.target.value)}}
          className="border mb-3 mt-3 rounded p-1.5 py-2.5 text-base w-full 
          focus:ring-2 focus:ring-blue-400 transition-all"
          />

        <p className="text-sm text-gray-600 mb-4">
          You have selected the{" "}
          <span className="font-medium">{title}</span> template. Click below to
          start creating your resume.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="block text-center cursor-pointer px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
                     text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 
                     transition-all duration-300"
                     >
          {isLoading?(
            <p className="flex flex-row gap-3">Building Your Resume..<LoaderCircle className="animate-spin"/></p>
          ):"Start Building Your Resume"}
        </motion.button>
            </form>
      </motion.div>
    </motion.div>
 
</AnimatePresence>
  )
}

export default CVSelection
