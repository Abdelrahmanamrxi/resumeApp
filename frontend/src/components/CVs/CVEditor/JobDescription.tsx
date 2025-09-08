import { BookText } from "lucide-react"

function JobDescription() {
  return (
    <div>
          <h3 className="font-semibold mt-4 text-sm mb-2 flex items-center gap-1">
         <BookText size={14}/> Job Description
             </h3>
             <p className="text-xs text-gray-500 mb-3 mt-2">* Paste your current job description here, and our AI will generate relevant keywords and tailored work experience suggestions.</p>
               <textarea
                 className="border rounded p-1.5 text-xs w-full h-16 resize-none focus:ring-2 focus:ring-blue-400 transition-all"
               />
                 
    </div>
  )
}

export default JobDescription
