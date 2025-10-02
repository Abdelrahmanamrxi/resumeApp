import React from "react"
import { Upload, FileTextIcon,Briefcase,Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import Loading from "@/components/Loading/Loading"
import { AxiosError } from "axios"
import api from "@/middleware/interceptor"
import { useNavigate } from "react-router-dom"
import useResumeUploader from "@/hooks/useResumeUploader"



function AnalyzeResume() {
    const[state,dispatch]=useResumeUploader()
    const navigate=useNavigate()
    

    const handleFileChange=(file:File)=>{
        dispatch({type:'SET_FILE_ERROR',payload:''})
      
        const fileSizeinMB=parseFloat((file.size / 1024 / 1024).toFixed(2))
        if(fileSizeinMB>5){
           dispatch({type:'SET_FILE_ERROR',payload:'File is too large please try to reduce file size and try again later.'})
        }
       
        else{
            dispatch({type:'SET_FILE',payload:file})
  
        }
    }
   const handleDragEvent=(e:React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault()
    e.stopPropagation()
    if(e.type==='dragenter' || e.type==="dragover"){
        dispatch({type:'SET_DRAG_EVENT',payload:true})
    }
    else if(e.type==="dragleave"){
        dispatch({type:'SET_DRAG_EVENT',payload:false})
    }
   }
   const handleFileDrop=(e:React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault()
    e.stopPropagation()
    dispatch({type:'SET_DRAG_EVENT',payload:false})
      if (e.dataTransfer.files && e.dataTransfer.files[0]) 
        handleFileChange(e.dataTransfer.files[0]);
        
        }
   const handleFileInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        dispatch({type:'SET_ERROR',payload:''})
        const files = e.target.files  
          if (files && files[0]) {
          handleFileChange(files[0]) 
   }
   }
  
   async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    try{
      e.preventDefault()
      dispatch({type:'SET_LOADING',payload:true})
      dispatch({type:'SET_ERROR',payload:''})
      const formData=new FormData()
      if(state.fileInformation.file){
        formData.append('file',state.fileInformation.file)
      }

    formData.append('jobDescription',state.jobDescription)
    const response=await api.post('/ats/analysis',formData)
    dispatch({type:'SET_ID',payload:response.data.response})
    dispatch({type:'SET_LOADING',payload:false})
    navigate(`${response.data.response}`)
  }
  catch(err){
    if(err instanceof AxiosError && err.response){
        dispatch({type:'SET_ERROR',payload:err.response.data.message})
        
    }
   dispatch({type:'SET_LOADING',payload:false})
    
  }
   }
  if(state.isLoading)
  return <Loading message="Analyzing your Resume Please hold on..."/>
  else
  return (
    <form onSubmit={handleSubmit} className="w-full justify-center flex flex-col items-center">
       

      
        <div className="bg-white md:w-3/4  rounded-2xl mt-5 shadow-xl p-8 mb-8">
          <div 
            className={`border-3  rounded-xl p-12 text-center transition-all duration-300 ${
              state.dragEvent 
                ? 'border-blue-500 bg-blue-50' 
                : state.fileInformation.file 
                ? 'border-blue-500 bg-green-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDragEvent}
            onDragLeave={handleDragEvent}
            onDragOver={handleDragEvent}
            onDrop={handleFileDrop}
          >
            <div className="flex flex-col items-center">
              {state.fileInformation.file ? (
                <>
                  <FileTextIcon className="w-16 h-16 text-green-800 mb-4" />
                  {state.fileInformation.error ?<p className="errorResults">{state.fileInformation.error}</p>:(
                    <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">File Ready!</h3>
                  <p className="text-gray-600 mb-4">{state.fileInformation.file.name}</p>
                  <p className="text-sm text-gray-500 mb-6">
                    Size: {(state.fileInformation.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                    </>
                  )}
             
                </>
              ) : (
                <>
                  <Upload className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Your Resume</h3>
                  {state.fileInformation.error ? <p className="errorResults">{state.fileInformation.error}</p>:
                  (
                    <>
                    <p className="text-gray-600 mb-4">Drag and drop your resume here, or click to browse</p>
                    <p className="text-sm text-gray-500 mb-6">Supports PDF, DOC, DOCX files up to 5MB</p>
                    <p className="errorMessage mb-3">{state.fileInformation.fileSizeError}</p>
                    </>
                  )
                  }
                  
                </>
              )}
              
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e)=>{handleFileInput(e)}}
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 hover:bg-blue-700 mt-3 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200 font-medium"
                >
                {state.fileInformation.file ? 'Change File' : 'Browse Files'}
              </label>
            </div>
          </div>
      
    </div>
    <div>
     
    </div>
     <div className="bg-white w-full md:w-3/4 rounded-2xl shadow-xl md:p-8 p-5 mb-8">
            <div className="flex  items-center  mb-2">
              <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="md:text-xl text-lg font-bold text-gray-800">Job Description</h2>
             
            </div>
             <span className="ml-2 text-sm text-gray-500">(Recommended)</span>
            <div className="space-y-4 mt-7">
              <p className="text-gray-600 text-sm">
                Paste the job description to get targeted insights about how well your resume matches the role.
              </p>
              
               
              <textarea
                onChange={(e)=>{dispatch({type:'SET_JOB',payload:e.target.value})}}
                placeholder="Paste the job description here for more targeted analysis...

Example: We are looking for a Software Engineer with experience in React, Node.js, and cloud technologies. The ideal candidate will have 3+ years of experience, strong problem-solving skills, and experience with Agile methodologies..."
                className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none"
              />
              </div>
    </div> 
    <Button className="px-8 py-5 mb-6">{!state.isLoading?"Analyze Resume":<span className="flex flex-row gap-2 items-center">Analyzing Resume.. <Loader className="animate-spin"/></span>}</Button>
    </form>
  )

}

export default AnalyzeResume
