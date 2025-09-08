
import { 
  Sparkles,
  FileText,
  ChevronRight,
  
} from 'lucide-react';
import {useEffect, useRef,useState} from 'react'
import SavedResumes from './SavedResumes/SavedResumes';

import { Link } from 'react-router-dom';
import CVSelection from '@/components/CVs/selection/CVSelection';
import { templates } from '@/components/CVs/constants/constant';
import { type ResumeData, type ResumeType } from '@/components/CVs/interfaces/cvInterface';
import { type ATS_SchemaInterface } from '../../interfaces'
import {motion} from 'framer-motion'
import { fadeUp } from '@/utils/comp';
import AISummary from './AISummary/AISummary';
import api from '@/middleware/interceptor';
import Loading from '@/components/Loading/Loading';
import { AxiosError } from 'axios';
   type DataWithTimeStamp=ResumeData & {
          updatedAt:Date,
          _id:string
        }
  export type SavedResumesType= Pick<DataWithTimeStamp,"updatedAt"|"resumeName"|"resumeType"|"_id"|"resumeType">

  export type LatestATSResultsType=Pick<ATS_SchemaInterface, "recommendations" | "foundKeywords" | "matchScore"|'missingKeywords'> & {
      _id:string
    }

const DashboardContent = () => {
  

    const ref=useRef<HTMLDivElement | null>(null)
    const scrollIntoView=()=>{
      if(ref.current){
        ref.current?.scrollIntoView({behavior:'smooth'})
      }
      }
    const[templateOpen,setTemplate]=useState<{title:string,id:ResumeType,src:string} | null>(null)
    const[isLoading,setLoading]=useState<boolean>(false)
    
    const [data,setData]=useState<{savedResumes:SavedResumesType[]| []  ,atsResults:LatestATSResultsType | '' }>()
    const [CustomError,setError]=useState<{savedResumes:string | null ,atsResults:string | null}>()

    const FetchAllResumes=async()=>{
      try{
        const response=await api.get('resume/getAllResumes')     
        return response.data 
      
      }
      catch(err){
        if(err instanceof AxiosError){
          throw new Error(err.response?.data.message)
        }
      }
      
    }
    const FetchLatestATSResults=async()=>{
      try{
        const response=await api.get('ats/getLatestResults') 
      
        return { recommendations:response.data.recommendations , foundKeywords:response.data.foundKeywords , matchScore:response.data.matchScore ,_id:response.data._id, missingKeywords:response.data.missingKeywords}  as LatestATSResultsType | ''
      }
      catch(err){
        console.log(err)
        if(err instanceof AxiosError){
          throw new Error(err.response?.data.message)
        }
      }
    }



    useEffect(()=>{
      setLoading(true)
      Promise.allSettled([FetchAllResumes(),FetchLatestATSResults()]).then((response)=>{
      
        setData({
          savedResumes:response[0].status==="fulfilled" && response[0].value ? response[0].value:[] ,
          atsResults:response[1].status==="fulfilled"  && response[1].value ? response[1].value : ''
        })
        setError({
          savedResumes:response[0].status==="rejected" && response[0].reason ? response[0].reason:'',
          atsResults:response[1].status==="rejected" && response[1].reason ? response[1].reason :''
        })
      }).finally(()=>{
        setLoading(false)
      })
     
    },[])
  console.log(data)
  if(isLoading) return <Loading message='Loading Data..'/>
  return (
       <div className="flex flex-1 mt-5 flex-col gap-4 p-4 pt-0">
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* AI Analyzer Card */}
       <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }}>
  <Link
    to="resume-analyze"
    className="block rounded-lg border bg-card p-6 hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className="flex items-center justify-between space-x-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-purple-100">
            <Sparkles className="h-4 w-4 text-purple-600" />
          </div>
          <h3 className="font-semibold">AI Resume Analyzer</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Get instant feedback and improve ATS score
        </p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  </Link>
</motion.div>

        {/* Browse Templates Card */}
        <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }}>
          <div
            onClick={scrollIntoView}
            className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Browse Templates</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose from professional templates
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Your Resumes Section */}
      { data?.savedResumes && <SavedResumes data={data?.savedResumes}/>}

      {/* Templates Preview */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="rounded-lg border bg-card"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Popular Templates</h2>
          </div>
          <motion.div
            ref={ref}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {templates.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -4 }}
                onClick={() =>
                  setTemplate({ id: item.id, title: item.title, src: item.src })
                }
                className="group cursor-pointer"
              >
                <img
                  src={item.src}
                  className="aspect-[3/4] rounded-lg bg-cover inset-0 pt-5 group-hover:shadow-md transition-all"
                />
                <p className="mt-2 text-sm font-medium">{item.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      {templateOpen && (
        <CVSelection
          id={templateOpen.id}
          title={templateOpen.title}
          setTemplate={setTemplate}
        />
      )}

      {/* AI Analysis Summary */}
     {data?.atsResults&&<AISummary latestResults={data.atsResults}/>}
    </div>
  );
};

export default DashboardContent;