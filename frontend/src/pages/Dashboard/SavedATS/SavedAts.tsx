import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "@/middleware/interceptor"
import Loading from "@/components/Loading/Loading"
import { useQuery,useQueryClient } from "@tanstack/react-query"
import {
  FileText,
  Calendar,
  CheckCircle,
  BarChart2,
  Upload,
  ArrowRight
} from "lucide-react"
import { AxiosError, type AxiosResponse } from "axios"
import type { ATS_SchemaInterface } from "@/interfaces"
import { useNavigate } from "react-router-dom"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { jwtDecode } from "jwt-decode"



interface Resume {
  id: string
  title: string
  createdAt: string
  matchScore: number
  foundKeywords: string[],
  verdict:'Strong Match' | "Moderate Match" | "Weak Match"
}






const SavedAts: React.FC = () => {
  let id:string |undefined
  const token=localStorage.getItem('token')
  if(token){
    const decoded=jwtDecode<{_id:string}>(token)
    id=decoded._id
  }
  const[filter,setFilter]=useState<string>('none')
  const queryClient=useQueryClient()
  const navigate=useNavigate()
  const fetchUserATS=async()=>{
      try{
        const response=await api.get(`/ats?filter=${filter}`) as Resume[] & AxiosResponse
        return response.data.map((data:Resume  & ATS_SchemaInterface)=>{
          return {id:data._id,title:data.fileDetails.fileName,createdAt:data.createdAt,matchScore:data.matchScore,foundKeywords:data.foundKeywords,verdict:data.verdict}
        })
      }
      catch(err){
        console.log(err)
        if(err instanceof AxiosError)
          if(err.code==="NETWORK_ERR")
          throw new Error('[NETWORK ERROR]: Please Try again later')
          else throw new Error(err.response?.data.message)
      }
  }
      const {data:resumes,isLoading,error}=useQuery({
      queryKey:['savedAts',id],
      queryFn:fetchUserATS,
      })
      useEffect(()=>{
        queryClient.invalidateQueries({queryKey:['savedAts']})
      },[filter])
 
     
  if(isLoading) return <Loading message="Fetching your ATS data..."/>

  if(error)  return <p className="flex h-full items-center justify-center text-red-600 font-mono text-bases">{error.message}</p>
  
  return (
    <div className="min-h-screen flex ">
      {/* Sidebar */}
    

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-6 py-8 border-b"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                Your ATS parsed resumes 
          </h2>
          <p className="text-gray-500 mt-1">
         
          </p>
          <div className="gap-2 flex flex-row mt-5">

          
        <Select  onValueChange={(value)=>{setFilter(value)}}>
        <SelectTrigger className="">
      <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      <SelectContent>
      <SelectItem value="none">None</SelectItem>
      <SelectItem value="score">Score</SelectItem>
      <SelectItem value="new">New</SelectItem>
      </SelectContent>
      </Select>
        
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 px-6 py-8"
        >
          {[
            {
              label: "Total ATS Scans",
              value: resumes.length,
              icon: <FileText className="text-blue-600" size={22} />,
            },
            {
              label: "Avg Match Score",
              value:
                resumes.length > 0
                  ? Math.round(
                      resumes.reduce((a:number, b:Resume) => a + b.matchScore, 0) /
                        resumes.length
                    )
                  : 0,
              icon: <BarChart2 className="text-green-600" size={22} />,
            },
            {
              label: "New Upload",
              value: "+ Add",
              to:'resume-analyze',
              icon: <Upload className="text-blue-600" size={22} />,
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              onClick={(()=>{
                if(stat.label==="New Upload")
                navigate('/user/dashboard/resume-analyze')
              })}
              className="bg-white/80 cursor-pointer backdrop-blur-md shadow-md rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition"
            >
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <h3 className="text-xl font-bold text-gray-800">
                  {stat.value}
                </h3>
              </div>
              {stat.icon}
            </motion.div>
          ))}
        </motion.div>

        {/* Resume Cards */}
     { resumes && resumes.length>0?
     <motion.div
          className="px-6 pb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {resumes.map((resume:Resume) => (
            <motion.div layout
              key={resume.id}
              initial={{ opacity: 0 ,y:20 ,scale:0.95}}
              animate={{ opacity: 1 , y:0 ,scale:1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="rounded-2xl bg-white/80 backdrop-blur-lg shadow-md p-6 border border-gray-100 flex flex-col"
            >
              {/* Card Header */}
              <div>
                
                <p className="flex flex-row gap-2 mb-3 text-base font-semibold"><FileText className="text-blue-700" />{resume.title}</p>
              </div>
            

              {/* Score */}
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-500" size={18} />
                <span className="text-sm text-gray-600">
                  Match Score:{" "}
                  <span className="font-semibold text-gray-900">
                    {resume.matchScore}%
                  </span>
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar size={16} />
                {new Date(resume.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour:'2-digit'
                })}
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {resume.foundKeywords.map((keywords,i)=>{
                  while(i<5){
                    return (
                        <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700"
                    >   {keywords}</span>
                    )
                  }

                })
                
                }
              </div>
              <p 
              onClick={()=>{
                navigate(`/user/dashboard/resume-analyze/${resume.id}`)
              }}
              className="mt-5 text-sm flex text-gray-500 hover:underline cursor-pointer flex-row items-center gap-2">View More <ArrowRight/></p>
            </motion.div>
          ))}
          
        </motion.div>:
      <div className="flex items-center justify-center mt-5">
      <h2 className="text-xl font-semibold text-gray-800">
      No resume analysis yet
      </h2>
      </div>
      }
      </div>
    </div>
  )
}

export default SavedAts
