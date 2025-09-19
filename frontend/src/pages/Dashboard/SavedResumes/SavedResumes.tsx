
import { FileText, Edit , Clock , NotepadTextDashed} from 'lucide-react'
import {motion} from 'framer-motion'
import { fadeUp } from '@/utils/comp'
import { type SavedResumesType } from '../DashboardContent'
import { timeAgo } from '@/utils/comp'
import { useNavigate } from 'react-router-dom'

function SavedResumes({data}:{data:SavedResumesType[] | []}) {
  const navigate=useNavigate()
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
               <motion.div
              onClick={()=>{navigate(`resume/${data._id}?resumeName=${data.resumeName}&resumeType=${data.resumeType}`)}}
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
                 <NotepadTextDashed size={14}/> {data.resumeType}
                   </span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-background rounded-md transition-colors">
                <Edit className="h-4 w-4 text-muted-foreground" />
              </button>
            </motion.div>

        
            )
            
           })
        
           }
           
          

            {/* Create New Resume */}
           
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SavedResumes
