import { motion, AnimatePresence } from "framer-motion";
import BasicInfoSection from "../CVEditor/BasicInfoSection";
import useResumeData from "@/hooks/useResumeData";
import WorkExperience from "../CVEditor/WorkExperience";
import Education from "../CVEditor/Education";
import Certifications from "../CVEditor/Certifications";
import Skills from "../CVEditor/Skills";
import ChooseColor from "../CVEditor/ChooseColor";
import { getColor } from "../constants/constant";
import JobDescription from "../CVEditor/JobDescription";
import SaveInformation from "../CVEditor/SaveInformation";
import type { ResumeData } from "../interfaces/cvInterface";
import React from "react";
import { Button } from "@/components/ui/button";


function CVTemplate1({data}:{data:ResumeData}) {
  const {resumeData,handleChange,newSoftSkill,
    addBulletPoint,removeCertification,
    removeBulletPoint,addCertification,
    addExperience,removeExperience,updateArrayItem,
    addEducation,newTechSkill,setNewSoftSkill,setNewTechSkill,
    addSkill,removeSkill,
    removeEducation,
    addAccentColor,addTextColor

  }=useResumeData(data)
 
  

  return (
    <div className="flex flex-col md:flex-row gap-4 relative p-4 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen font-sans">
      {/* Editor Panel */}
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
        addSkill={addSkill} removeSkill={removeSkill} /> 
        <ChooseColor addTextColor={addTextColor} addAccentColor={addAccentColor}/> 
        <JobDescription/>
        <SaveInformation/>
        
      </motion.div>

      {/* Preview Panel */}


      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        id="resume"
        className="w-full md:w-3/5 bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-2rem)] overflow-y-auto"
      >
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 
          style={{ color: getColor(resumeData.color.textColor, 800) }}
          className={`text-2xl font-bold `}>{resumeData.name}</h1>
          <p
          style={{ color: getColor(resumeData.color.textColor, 600) }} 
          className="text-xs  mt-1">
       
            {resumeData.email} | {resumeData.phone} | {resumeData.location} | {resumeData.linkedin}
          </p>
        </motion.header>

        <motion.section 
          className="mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 
                style={{ color: getColor(resumeData.color.textColor, 700),borderColor: getColor(resumeData.color.accentColor,600) }}
          className={`text-sm font-bold ${resumeData.summary?"border-b-2":""}  pb-1 mb-2 `}>
            {resumeData.summary?"Professional Summary":""}
          </h2>
          <p 
          style={{ color: getColor(resumeData.color.textColor, 600) }}
          className={`text-xs  leading-relaxed`}>{resumeData.summary}</p>
        </motion.section>

        <motion.section 
          className="mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2
          style={{ color: getColor(resumeData.color.textColor, 700),borderColor: getColor(resumeData.color.accentColor,600) }} 
          className={`text-sm font-bold ${resumeData.experiences.length>0?"border-b-2":""}  pb-1 mb-2 `}>
          {resumeData.experiences.length>0?'Work Expiernece':''}
          </h2>
          <AnimatePresence>
            {resumeData.experiences.map((exp, i) => (
              <motion.div 
                key={i} 
                className="mb-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex flex-row justify-between">

                <div
                style={{ color: getColor(resumeData.color.textColor, 800) }} 
                className={`font-semibold text-sm `}>{exp.jobTitle}</div>
                  <p  style={{color:getColor(resumeData.color.textColor,800)}}  className="text-sm"> ({exp.from.toLocaleDateString("en-US",{month:'short',year:"numeric"})}) - ({exp.To.toLocaleDateString("en-US",{month:'short',year:"numeric"})}) </p>
                </div>
                <div 
                style={{ color: getColor(resumeData.color.textColor, 600) }}
                className={`italic text-xs `}>{exp.company}</div>
                <ul className="list-disc list-inside mt-1">
                  {exp.points.filter(p => p).map((point, pi) => (
                    <motion.li 
                      key={pi} 
                      style={{ color: getColor(resumeData.color.textColor, 600) }}
                      className={`text-xs ml-2`}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: pi * 0.05 }}
                    >
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        <motion.section 
          className="mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2
          style={{ color: getColor(resumeData.color.textColor, 700), borderColor: getColor(resumeData.color.accentColor,600) }} 
          className={`text-sm font-bold ${resumeData.education.length>0?"border-b-2":""}  pb-1 mb-2 `}>
         {resumeData.education.length>0?'Education':''}
          </h2>
          {resumeData.education.map((edu, i) => (
            <div className="flex flex-row justify-between">

            <motion.p 
              key={i} 
              style={{ color: getColor(resumeData.color.textColor, 600) }}
              className={`text-xs  mb-1`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              >
              <strong>{edu.degree}</strong>, {edu.institution} 
            </motion.p>
            <p className="text-sm">({edu.from.toLocaleDateString("en-US",{month:'short',year:"numeric"})}) - ({edu.To.toLocaleDateString("en-US",{month:'short',year:"numeric"})})</p>
              </div>
          ))}
        </motion.section>

        {resumeData.certifications.length > 0 && (
          <motion.section 
            className="mt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 
            style={{ color: getColor(resumeData.color.textColor, 700),borderColor: getColor(resumeData.color.accentColor,600) }} 
            className={`text-sm font-bold  ${resumeData.certifications.length>0?'border-b-2':''}  pb-1 mb-2 `}>
               {resumeData.certifications.length>0?'Education':''}
            </h2>
            {resumeData.certifications.map((cert, i) => (
              <div className="flex flex-row mt-2 justify-between">
              <motion.p 
                key={i} 
                style={{ color: getColor(resumeData.color.textColor, 600) }}
                className={`text-xs mb-1`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                >
                <strong>{cert.title}</strong> - {cert.issuer} 
              </motion.p>
              <p className="text-sm">({new Date(cert.year).toLocaleDateString("en-US",{month:'short',year:"numeric"})})</p>
                </div>
            ))}
          </motion.section>
        )}

        <motion.section 
          className="mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 
          style={{ color: getColor(resumeData.color.textColor, 700),borderColor: getColor(resumeData.color.accentColor,600) }}
          className={`text-sm font-bold  ${resumeData.skills.technical.length>0 || resumeData.skills.soft.length>0?'border-b-2':''}  pb-1 mb-2 `}>
           {resumeData.skills.technical.length>0 || resumeData.skills.soft.length>0?'Skills':''}
          </h2>
          {resumeData.skills.technical.length > 0 && (
            <div className="mb-2">
              <span
              style={{ color: getColor(resumeData.color.textColor, 700) }}
              className={`text-xs font-semibold `}>Technical: </span>
              <span
                style={{ color: getColor(resumeData.color.textColor, 600) }}
               className="text-xs">
                {resumeData.skills.technical.join(", ")}
              </span>
            </div>
          )}
          {resumeData.skills.soft.length > 0 && (
            <div>
              <span
              style={{ color: getColor(resumeData.color.textColor, 700) }} 
              className={`text-xs font-semibold `}>Soft Skills: </span>
              <span
              style={{ color: getColor(resumeData.color.textColor, 600) }} 
              className="text-xs">
                {resumeData.skills.soft.join(", ")}
              </span>
            </div>
          )}
        </motion.section>
          <Button className="px-8 py-2xx hidden md:flex absolute bottom-10 right-10 ">Save Resume</Button>
      </motion.div>
     <Button className="px-8 md:hidden py-2 ">Save Resume</Button>
    </div>
  );
}
export default React.memo(CVTemplate1)