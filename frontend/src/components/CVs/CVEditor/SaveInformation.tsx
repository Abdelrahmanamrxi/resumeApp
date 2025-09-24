
import { Button } from "@/components/ui/button"
import api from "@/middleware/interceptor"
import { AxiosError } from "axios"
import { useAppDispatch } from "@/hooks/useReducerHooks"
import { setDisabled } from "@/slices/resumeReducer"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { Loader,Check,X } from "lucide-react"
import {motion} from 'framer-motion'
import type { ResumeData } from "../interfaces/cvInterface"

function SaveInformation({stringifiedFields,resumeData}:{stringifiedFields:string,resumeData:ResumeData}) {


    const[error,setError]=useState<{preview:string,save:string}>({
      preview:'',
      save:''
    })
    const[isLoading,setLoading]=useState<{preview:boolean,save:boolean}>({
      preview:false,
      save:false
    })
    const[success,setSuccess]=useState<boolean>(false)

    const {resumeId}=useParams()
    const dispatch=useAppDispatch()

    async function SaveResume(){
    try{
      setSuccess(false)
      dispatch(setDisabled(true))
        setLoading((prev)=>{
        return {...prev,save:true}
      })
      const response=await api.patch(`/resume/${resumeId}`,stringifiedFields)
      if(response.data){
        setSuccess(true)
        setTimeout(()=>{
          setSuccess(false)
        },2000)
      }
         
      
      
    }
    catch(err){
      if(err instanceof AxiosError){
        if(err.code==="ERR_NETWORK") 
        setError((prev)=>{
          return {...prev,save:'Connection Lost. Please Try again later.'}
        })
        else
        setError((prev)=>{
          return {...prev,save:err.response?.data.message}
        })
      setTimeout(()=>{
         setError((prev)=>{
          return {...prev,save:''}
        })
      },2000)
      }
      console.log(err)
      
    }
    finally{
      dispatch(setDisabled(false))
      setLoading((prev)=>{
        return {...prev,save:false}
      })
   
    }
    }


    async function DownloadCV(){
      try{
        dispatch(setDisabled(true))
        setLoading((prev)=>{
        return {...prev,preview:true}
      })
        delete resumeData._id
        delete resumeData.userId

        const response=await api.post('/resume/pdf',resumeData,{ responseType:'blob' })

        const blob=new Blob([response.data],{type:'application/pdf'})
        const url=window.URL.createObjectURL(blob)

        window.open(url,'_blank')
      }
      catch(err){
        if(err instanceof AxiosError){
        if(err.code==="ERR_NETWORK") 
        setError((prev)=>{
          return {...prev,preview:"Connection Lost, Couldn't Preview File."}
        })
        else
        setError((prev)=>{
        return {...prev,preview:err.response?.data.message}
      })
      setTimeout(()=>{
         setError((prev)=>{
          return {...prev,preview:''}
        })
      },2000)
      }
      }
      finally {
          dispatch(setDisabled(false))
          setLoading((prev)=>{
          return {...prev,preview:false}
      })
      }
    }


  return (
    <>
    <div className="flex  flex-row  justify-between">
     <div className="flex flex-col justify-between">

    <p className="text-xs text-gray-500"> * Make sure everything looks good before downloading your CV!</p>
    {error['preview'] && <p className="errorMessage">{error['preview']}</p>}
     </div>
    <div className="flex  justify-end mt-5">
       
           <button
            onClick={DownloadCV}
            className=" px-8  py-2 mt-2 text-white text-sm cursor-pointer font-medium 
            bg-gradient-to-r from-blue-500 to-blue-600 
            rounded-lg shadow-md 
            hover:from-blue-600 hover:to-blue-700 
            active:scale-95 
            transition-all duration-300 ease-in-out">
              {isLoading.preview?"Previewing..." :'Preview Resume'} </button>

              
          </div>

                 </div>
                
                 <Button onClick={SaveResume} className="bg-blue-500 fixed m-8 px-8 py-2 right-0 bottom-0">{
                isLoading.save ?
                  (
                    <p className="flex flex-row gap-2 items-center ">Saving... <Loader className="animate-spin"/></p>
                  )
                 :success?( 
                  <p className="flex flex-row gap-2 items-center"> Saved Succesfully <Check/></p>

                 ):"Save"}</Button>
                {error['save'] && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
               flex items-center gap-3
               bg-white  border border-red-200 text-red-800
               shadow-lg rounded-lg px-4 py-3 w-[90%] max-w-md"
  >
    <X
      onClick={() => {setError(prev=>({...prev,save:''}))}}
      size={18}
      className="cursor-pointer mt-1 text-red-500 hover:text-red-700"
    />
    <p className="text-sm font-medium">{error['save']}</p>
  </motion.div>
)}

            </>
  )
}

export default SaveInformation
