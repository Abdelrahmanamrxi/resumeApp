
import { useParams } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import ModernMini from '@/components/CVs/CVTemplates/ModernMini'
import ModernProf from '@/components/CVs/CVTemplates/ModernProf'
import MiniProf from '@/components/CVs/CVTemplates/MiniProf'
import ModernTwo from '@/components/CVs/CVTemplates/ModernTwo'
import api from '@/middleware/interceptor'
import { useEffect } from 'react'
import { useState } from 'react'
import {type  ResumeData } from '@/components/CVs/interfaces/cvInterface'
import { AxiosError } from 'axios'
import Loading from '@/components/Loading/Loading'
import { type Education , type Certification , type Experience } from '@/components/CVs/interfaces/cvInterface'
function CVTemplate() {
    const[data,setData]=useState<ResumeData>()
    const[isLoading,setLoading]=useState<boolean>(false)
    const[customError,setError]=useState<string>('')
    const {resumeId}=useParams()
    const [searchParams]=useSearchParams()
    const resumeType:string=searchParams.get('resumeType') ?? ""

    const fetchResume=async()=>{
            setError('')
            setLoading(true)
        try{
            
            const response=await api.get(`resume/getResume/${resumeId}?resumeType=${resumeType}`)

            const data={...response.data,experiences:response.data.experiences.map((exp:Experience)=>{
                return {...exp,from:new Date(exp.from),To:new Date(exp.To)}
            }),education:response.data.education.map((edu:Education)=>{
                return {...edu,from:new Date(edu.from),To:new Date(edu.To)}
            }),certifications:response.data.certifications.map((cert:Certification)=>{
                return {...cert,year:new Date(cert.year)}
            })}

            setData(data)
            setLoading(false)
        }
        catch(err){
            console.log(err)
            if(err instanceof AxiosError)
            setError(err.response?.data.message)
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchResume()
    },[resumeId])
    if(isLoading && !data) return <Loading message='Retrieving Resume Please wait...'/>
    if(customError) return <p className='flex items-center justify-center h-screen text-red-700 font-semibold text-lg'> [ERROR] : {customError}</p>
    if(resumeType==="modernMinimalist" && data) return <ModernMini data={data}/>
    if(resumeType==="modernProfessional" && data) return <ModernProf data={data}/>
    if(resumeType==="minimalProfessional" && data) return <MiniProf data={data}/>
    if(resumeType==="modernTwoColumn" && data) return <ModernTwo data={data}/>
    else return <p>Template Not Found</p>
}

export default CVTemplate
