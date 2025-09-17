import {motion,AnimatePresence} from 'framer-motion'
import useResumeData from '@/hooks/useResumeData'
import BasicInfoSection from '../CVEditor/BasicInfoSection'
import WorkExperience from '../CVEditor/WorkExperience'
import Education from '../CVEditor/Education'
import Certifications from '../CVEditor/Certifications'
import Skills from '../CVEditor/Skills'
import JobDescription from '../CVEditor/JobDescription'
import SaveInformation from '../CVEditor/SaveInformation'
import type { ResumeData } from '../interfaces/cvInterface'
import { Button } from '@/components/ui/button'

const CVTemplate4 = ({data}:{data:ResumeData}) => {
        const {resumeData,handleChange,newSoftSkill,
        addBulletPoint,removeCertification,
        removeBulletPoint,addCertification,
        addExperience,removeExperience,updateArrayItem,
        addEducation,newTechSkill,setNewSoftSkill,setNewTechSkill,
        addSkill,removeSkill,
        removeEducation}=useResumeData(data)



  return (
    <div className='flex flex-col md:flex-row gap-4 p-4 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen font-sans'>

             <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-2/5 space-y-4 bg-white p-4 rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-2rem)]"
              >
                <BasicInfoSection resumeData={resumeData} handleChange={handleChange}/>
                <WorkExperience resumeData={resumeData} addBulletPoint={addBulletPoint} removeBulletPoint={removeBulletPoint} addExperience={addExperience} updateArrayItem={updateArrayItem} removeExperience={removeExperience} />
                <Education resumeData={resumeData} addEducation={addEducation} removeEducation={removeEducation} updateArrayItem={updateArrayItem}/>
                <Certifications resumeData={resumeData} addCertification={addCertification} updateArrayItem={updateArrayItem} removeCertification={removeCertification} />
                <Skills resumeData={resumeData} newSoftSkill={newSoftSkill} newTechSkill={newTechSkill} 
                setNewTechSkill={setNewTechSkill} setNewSoftSkill={setNewSoftSkill}
                addSkill={addSkill} removeSkill={removeSkill}
                />
                <JobDescription/>
                <SaveInformation/>
              
              </motion.div>




          <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="resume"
      className="w-full md:w-3/5 bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-2rem)] overflow-y-auto border-t-8 border-slate-700"
    >
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-700 text-white p-4 rounded-lg mb-6"
      >
        <h1 className="text-2xl font-bold">{resumeData.name}</h1>
        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
          <div>{resumeData.email}</div>
          <div>{resumeData.phone}</div>
          <div>{resumeData.location}</div>
          <div>{resumeData.linkedin}</div>
        </div>
      </motion.header>

      <motion.section 
        className="mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className={`text-sm font-bold ${resumeData.summary?"":"hidden"} text-slate-700 border-b border-slate-300 pb-1 mb-3`}>
          {resumeData.summary?"PROFESSIONAL SUMMARY":""}
        </h2>
        <p className="text-xs text-gray-700 leading-relaxed">{resumeData.summary}</p>
      </motion.section>

      <motion.section 
        className="mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className={`text-sm font-bold ${resumeData.experiences.length>0?"":"hidden"} text-slate-700 border-b border-slate-300 pb-1 mb-3`}>
          {resumeData.experiences.length>0?'PROFESSIONAL EXPERIENCE':''}
        </h2>
        <AnimatePresence>
          {resumeData.experiences.map((exp, i) => (
            <motion.div 
              key={i} 
              className="mb-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bg-slate-50 p-3 rounded">
                <div className="font-bold text-sm text-slate-800">{exp.jobTitle}</div>
                <div className='flex flex-row justify-between'>
                <div className="text-xs text-slate-600 font-medium">{exp.company}</div>
                <p className="text-xs text-slate-600 font-medium">{exp.from.toLocaleDateString("en-US",{month:'short',year:'numeric'})} - {exp.To.toLocaleDateString('en-US',{month:'short',year:'numeric'})}</p>
                  </div>
                <ul className="list-none mt-2">
                  {exp.points.filter(p => p).map((point, pi) => (
                    <motion.li 
                      key={pi} 
                      className="text-xs text-gray-700 mb-1 flex items-start"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: pi * 0.05 }}
                    >
                      <span className="text-slate-500 mr-2 font-bold">▪</span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={`text-sm font-bold ${resumeData.education.length>0?"":"hidden"} text-slate-700 border-b border-slate-300 pb-1 mb-3`}>
            {resumeData.education.length>0?'EDUCATION':''}
          </h2>
          {resumeData.education.map((edu, i) => (
            <motion.div 
              key={i} 
              className="text-xs text-gray-700 mb-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="font-semibold text-slate-800">{edu.degree}</div>
              <div>{edu.institution}</div>
              <div className='flex flex-row gap-2 '>

              <div className="text-slate-600">{edu.from.toLocaleDateString("en-US",{month:'short',year:'numeric'})}</div>
              -
              <div className='text-slate-600'>{edu.To.toLocaleDateString("en-US",{month:'short',year:'numeric'})}</div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className={`text-sm font-bold ${resumeData.skills.technical.length>0 || resumeData.skills.soft.length>0?"":"hidden"} text-slate-700 border-b border-slate-300 pb-1 mb-3`}>
            {resumeData.skills.technical.length>0 || resumeData.skills.soft.length>0?'KEY SKILLS':''}
          </h2>
          {resumeData.skills.technical.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-semibold text-slate-800 mb-1">Technical Skills</div>
              <div className="text-xs text-gray-700">
                {resumeData.skills.technical.join(", ")}
              </div>
            </div>
          )}
          {resumeData.skills.soft.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-800 mb-1">Soft Skills</div>
              <div className="text-xs text-gray-700">
                {resumeData.skills.soft.join(", ")}
              </div>
            </div>
          )}
        </motion.section>
      </div>

      {resumeData.certifications.length > 0 && (
        <motion.section 
          className="mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-sm font-bold text-slate-700 border-b border-slate-300 pb-1 mb-3">
            CERTIFICATIONS
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {resumeData.certifications.map((cert, i) => (
              <motion.div 
                key={i} 
                className="text-xs text-gray-700"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="font-semibold text-slate-800">{cert.title}</span> - {cert.issuer} ({new Date(cert.year).toLocaleDateString("en-US",{month:'short',year:'numeric'})})
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
       <Button className="px-8 py-2xx hidden md:flex absolute bottom-10 right-10 ">Save Resume</Button>
    </motion.div>
     <Button className="px-8 md:hidden py-2 ">Save Resume</Button>
    </div>
  )
}

export default CVTemplate4
