import {motion,AnimatePresence} from 'framer-motion'
import useResumeData from '@/hooks/useResumeData'
import BasicInfoSection from '../CVEditor/BasicInfoSection'
import WorkExperience from '../CVEditor/WorkExperience'
import Education from '../CVEditor/Education'
import Skills from '../CVEditor/Skills'
import Certifications from '../CVEditor/Certifications'
import { getColor } from '../constants/constant'
import ChooseColor from '../CVEditor/ChooseColor'
import JobDescription from '../CVEditor/JobDescription'
import SaveInformation from '../CVEditor/SaveInformation'
import type { ResumeData } from '../interfaces/cvInterface'
function CVTemplate3({data}:{data:ResumeData}) {

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
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen font-sans">
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
        <ChooseColor addTextColor={addTextColor} addAccentColor={addAccentColor}/>
        <JobDescription/>
        <SaveInformation/>
      </motion.div>



  <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="resume"
      className="w-full md:w-3/5 bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-2rem)] overflow-y-auto"
      style={{ color: getColor(resumeData.color.textColor, 700) }}
    >
      {/* HEADER */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center border-b pb-4 mb-6"
        style={{ borderColor: getColor(resumeData.color.accentColor, 600) }}
      >
        <h1
          className="text-3xl font-light mb-1"
          style={{ color: getColor(resumeData.color.textColor, 800) }}
        >
          {resumeData.name}
        </h1>
        <p style={{ color: getColor(resumeData.color.textColor, 600) }} className="text-xs">
          {resumeData.email} • {resumeData.phone} • {resumeData.location} •{" "}
          {resumeData.linkedin}
        </p>
      </motion.header>

      {/* SUMMARY */}
      <motion.section
        className="mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2
          className={`text-sm font-medium uppercase tracking-wide mb-3 ${
            resumeData.summary ? "" : "hidden"
          }`}
          style={{ color: getColor(resumeData.color.accentColor, 700) }}
        >
          {resumeData.summary ? "Summary" : ""}
        </h2>
        <p className="text-xs leading-relaxed mb-6" style={{ color: getColor(resumeData.color.textColor, 600) }}>
          {resumeData.summary}
        </p>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section
        className="mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2
          className={`text-sm font-medium uppercase tracking-wide mb-3 ${
            resumeData.experiences.length > 0 ? "" : "hidden"
          }`}
          style={{ color: getColor(resumeData.color.accentColor, 700) }}
        >
          {resumeData.experiences.length > 0 ? "Experience" : ""}
        </h2>
        <AnimatePresence>
          {resumeData.experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="mb-4 pb-4 border-b last:border-0"
              style={{ borderColor: getColor(resumeData.color.accentColor, 600) + "20" }} // faint border
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-sm" style={{ color: getColor(resumeData.color.textColor, 800) }}>
                  {exp.jobTitle}
                </div>
              </div>
              <div className='flex flex-row justify-between'>

              <div className="text-xs mb-2" style={{ color: getColor(resumeData.color.textColor, 700) }}>
                {exp.company}
              </div>
                <p  className='text-xs mt-2 text-gray-500'>{exp.from.toLocaleDateString("en-US",{month:'short',year:"numeric"})} - {exp.To.toLocaleDateString("en-US",{month:'short',year:"numeric"})}</p>
              </div>
              <ul className="space-y-1">
                {exp.points.filter((p) => p).map((point, pi) => (
                  <motion.li
                    key={pi}
                    className="text-xs flex items-start"
                    style={{ color: getColor(resumeData.color.textColor, 600) }}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: pi * 0.05 }}
                  >
                    <span style={{ color: getColor(resumeData.color.textColor, 600) }} className="mr-2">
                      •
                    </span>
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      {/* EDUCATION */}
      <motion.section
        className="mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2
          className={`text-sm font-medium uppercase tracking-wide mb-3 ${
            resumeData.education.length > 0 ? "" : "hidden"
          }`}
          style={{ color: getColor(resumeData.color.accentColor, 700) }}
        >
          {resumeData.education.length > 0 ? "Education" : ""}
        </h2>
        {resumeData.education.map((edu, i) => (
          <div className='flex flex-row justify-between'>

          <motion.p
            key={i}
            className="text-xs mb-2"
            style={{ color: getColor(resumeData.color.textColor, 600) }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            >
            <strong style={{ color: getColor(resumeData.color.textColor, 800) }}>{edu.degree}</strong>
            <br />
            {edu.institution} 
          </motion.p>
          <p className='text-gray-500 mt-2 text-xs'>  {edu.from.toLocaleDateString("en-US",{month:'short',year:"numeric"})} - {edu.To.toLocaleDateString("en-US",{month:'short',year:"numeric"})}</p>
        </div>
        ))}
      </motion.section>

      {/* CERTIFICATIONS */}
      {resumeData.certifications.length > 0 && (
        <motion.section
          className="mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2
            className="text-sm font-medium uppercase tracking-wide mb-3"
            style={{ color: getColor(resumeData.color.accentColor, 700) }}
          >
            Certifications
          </h2>
          {resumeData.certifications.map((cert, i) => (
            <div className='flex flex-row justify-between'>
            <motion.p
              key={i}
              className="text-xs mb-2"
              style={{ color: getColor(resumeData.color.textColor, 600) }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              >
              <strong style={{ color: getColor(resumeData.color.textColor, 800) }}>{cert.title}</strong>
              <br />
              {cert.issuer} 
            </motion.p>
            <p className='text-gray-500 text-xs'>{new Date(cert.year).toLocaleDateString("en-US",{month:'short',year:"numeric"})}</p>
              </div>
          ))}
        </motion.section>
      )}

      {/* SKILLS */}
      <motion.section
        className="mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2
          className={`text-sm font-medium uppercase tracking-wide mb-3 ${
            resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0
              ? ""
              : "hidden"
          }`}
          style={{ color: getColor(resumeData.color.accentColor, 700) }}
        >
          {resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0
            ? "Skills"
            : ""}
        </h2>
        {resumeData.skills.technical.length > 0 && (
          <div className="mb-3">
            <span
              className="text-xs font-medium block mb-1"
              style={{ color: getColor(resumeData.color.textColor, 800) }}
            >
              Technical
            </span>
            <span className="text-xs" style={{ color: getColor(resumeData.color.textColor, 600) }}>
              {resumeData.skills.technical.join(" • ")}
            </span>
          </div>
        )}
        {resumeData.skills.soft.length > 0 && (
          <div>
            <span
              className="text-xs font-medium block mb-1"
              style={{ color: getColor(resumeData.color.textColor, 800) }}
            >
              Soft Skills
            </span>
            <span className="text-xs" style={{ color: getColor(resumeData.color.textColor, 600) }}>
              {resumeData.skills.soft.join(" • ")}
            </span>
          </div>
        )}
      </motion.section>
    </motion.div>
    </div>
  )
}

export default CVTemplate3
