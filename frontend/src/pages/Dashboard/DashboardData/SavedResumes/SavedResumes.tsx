
import { FileText, Edit , Clock , NotepadTextDashed,Trash2,X,Loader} from 'lucide-react'
import {motion} from 'framer-motion'
import { fadeUp } from '@/utils/comp'
import { type SavedResumesType } from '../DashboardContent'
import { timeAgo } from '@/utils/comp'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import api from '@/middleware/interceptor'
import { AxiosError, type AxiosResponse } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'



function SavedResumes({data}:{data:SavedResumesType[] | []}) {
  const[deletePopUp,setPopUp]=useState<{opened:boolean,resumeId:string | null}>({
    opened:false,
    resumeId:null
  })
  const queryClient=useQueryClient()
  const navigate=useNavigate()
  async function deleteResume(resumeId:string):Promise<AxiosResponse>{
    try{
      const response=await api.delete(`/resume/${resumeId}`)
      return response.data
    }
    catch(err){
      if(err instanceof AxiosError){
        if(err.code==="ERR_NETWORK") 
        throw new Error('Network Error Please try again later.')
        else throw new Error(err.response?.data.message)
      }
      throw new Error ('Unexpected Error While Deleting Resume')
    }
  }


  const mutation=useMutation<AxiosResponse,Error,string>({
    mutationFn:(resumeId:string)=>deleteResume(resumeId),
    onSuccess:()=>{
      const token=localStorage.getItem('token')
      let _id:string | undefined
      if(token){
        const decoded=jwtDecode<{_id:string}>(token)
        _id=decoded._id
      }
      queryClient.invalidateQueries({queryKey:['savedResumes',_id]})
    }
  })




  

  return (
    <div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="rounded-lg border bg-card"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Resumes</h2>
            <button className="text-sm text-muted-foreground hover:text-primary">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {data.length<0 && <p className='flex items-center justify-center text-lg font-semibold h-32'>Start by creating your Resume Today.</p>}
            {data.length>0 && data.map((data:SavedResumesType)=>{
            return(
              <motion.div key={data._id}
              
              variants={fadeUp}
              whileHover={{ scale: 1.01 }}
              className="flex cursor-pointer items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{data.resumeName}</p>
                  <div className="flex items-center  mt-1">
                      <div className='flex flex-col'>
                        <div className='flex flex-row gap-1 items-center '>
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Edited {timeAgo(data.updatedAt)}
                    </span>
                        </div>
                   <span className='text-xs flex flex-row  gap-1  items-center mt-2  text-muted-foreground'>
                 <NotepadTextDashed  size={14}/> {data.resumeType}
                   </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='items-center gap-2 flex md:flex-row flex-col'>

              <button onClick={()=>{navigate(`resume/${data._id}?resumeName=${data.resumeName}&resumeType=${data.resumeType}`)}} className="p-2 hover:bg-background rounded-md cursor-pointer transition-colors">
                <Edit   className="h-4 w-4 text-muted-foreground" />
              </button>
              <button onClick={()=>{setPopUp({resumeId:data._id,opened:true})}}  className='p-2 rounded-md cursor-pointer transition-colors'>
                <Trash2 className='hover:text-red-600 cursor-pointer hover:font-semibold h-4 w-4 text-muted-foreground'/>
              </button>
              </div>
                
            </motion.div>

        
            )
            
           })
        
           }
           
          
           
          </div>
        </div>
      </motion.div>
   {deletePopUp.opened && deletePopUp.resumeId && 
    <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300"
>
  <div className="relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-out scale-95 animate-fadeIn text-black">
    {/* Close button */}
    <X
      onClick={() => setPopUp({resumeId:null,opened:false})}
      className="absolute right-3 top-3 h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
    />

    {/* Content */}
    <h3 className="mt-4 text-lg font-semibold text-gray-800">
      Are you sure you want to delete this resume?
    </h3>
    {mutation.isError && mutation.error ? <p className='errorMessage mt-2'>{mutation.error?.message}</p>:''}
    <p className="mt-2 text-sm text-gray-500">
      This action cannot be undone. Once deleted, the resume will be permanently removed.
    </p>

    {/* Buttons */}
    <div className="mt-6 flex justify-end gap-3">
      <Button
        className="px-4"
        variant="secondary"
        onClick={() => setPopUp({opened:false,resumeId:null})}
        >
        Cancel
      </Button>
      <Button
      onClick={()=>{
        if(deletePopUp.resumeId){
          mutation.mutate(deletePopUp.resumeId)
          setPopUp({resumeId:null,opened:false})
        }
        
      }}
      className="px-4" variant="destructive">
        {mutation.isPending?<p className='flex flex-row gap-2 items-center'>Deleting.. <Loader className='animate-spin'/></p> : "Delete"}
      </Button>
    </div>
  </div>
</div> }
    </div>
  ) 
}

export default SavedResumes
