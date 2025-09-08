
import {motion} from 'framer-motion'
import { useState } from "react";
import { fadeUp } from '@/utils/comp'
import { Sparkles , ChevronRight } from 'lucide-react'
import { type LatestATSResultsType } from '../DashboardContent'
import ATSAnalysis from '../ResumeAnalyze/ATSAnaylsis'

function AISummary({latestResults}:{latestResults:LatestATSResultsType}) {
  const[checkATSResults,setResults]=useState<boolean>(false)
  return (
     <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="rounded-lg border bg-card"
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold"> Latest AI Analysis Summary</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }}>
              <p className="text-sm text-muted-foreground">Overall Score</p>
             
              <p className="text-2xl font-bold">{latestResults.matchScore}</p>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }}>
              <p className="text-sm text-muted-foreground">Keywords Matched</p>
              <p className="text-2xl font-bold">{latestResults.foundKeywords.length}/{latestResults.foundKeywords.length + latestResults.missingKeywords.length}</p>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }}>
              <p className="text-sm text-muted-foreground">Suggestions</p>
              <p className="text-2xl font-bold">{latestResults.recommendations.length}</p>
            </motion.div>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
          >
            View detailed analysis
            <ChevronRight className="h-3 w-3" />
          </motion.button>
        </div>
      </motion.div>
  )
}

export default AISummary
