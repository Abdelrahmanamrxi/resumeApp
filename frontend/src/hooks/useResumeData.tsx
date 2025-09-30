import { useState } from "react"
import type { ResumeData,ResumeDataArray } from "@/components/CVs/interfaces/cvInterface"

// import {diff} from 'just-diff'
import {diff} from 'deep-diff'

const useResumeData = (initialData:ResumeData) => {
      const [resumeData, setResumeData] = useState<ResumeData>(initialData);
      const [newTechSkill, setNewTechSkill] = useState("");
      const [newSoftSkill, setNewSoftSkill] = useState("");
     
      const stringifiedFields=diff(initialData,resumeData)
   
      // track changed fields once resume data is fetched
      console.log(stringifiedFields)
  
      // handles basic info fields ex name phone links etc

      const handleChange = (field: keyof ResumeData, value: string) => {
        setResumeData((prev) => ({ ...prev, [field]: value }));
      };
      const updateArrayItem = <T extends ResumeDataArray,K extends keyof ResumeData[T][number]>(
        section: T,
        index: number,
        key: K,
        value:ResumeData[T][number][K]
      ) => {
        const updated = [...(resumeData[section])];
        updated[index][key] = value;
        setResumeData((prev) => ({ ...prev, [section]: updated }));
      };
    
      const addExperience = ():void => {
        setResumeData((prev) => ({
          ...prev,
          experiences: [
            ...prev.experiences,
            { jobTitle: "", company: "", points: [""] ,from:new Date('2022-04-05'),To:new Date("2024-04-05")},
          ],
        }));
      };
    
      const removeExperience = (index: number) => {
        setResumeData((prev) => ({
          ...prev,
          experiences: prev.experiences.filter((_, i) => i !== index),
        }));
      };
    
      const addBulletPoint = (expIndex: number) => {
        const updated = [...resumeData.experiences];
        updated[expIndex].points.push("");
        setResumeData((prev) => ({ ...prev, experiences: updated  }))
      }

      const removeBulletPoint = (expIndex: number, pointIndex: number) => {
        const updated = [...resumeData.experiences];
        updated[expIndex].points = updated[expIndex].points.filter((_, i) => i !== pointIndex);
        setResumeData((prev) => ({ ...prev, experiences: updated }));
      };
    
      const addEducation = () => {
        setResumeData((prev) => ({
          ...prev,
          education: [...prev.education, { degree: "", institution: "", from: new Date('2022-04-05'),To:new Date("2026-04-05") }],
        }));
      };
    
      const removeEducation = (index: number) => {
        setResumeData((prev) => ({
          ...prev,
          education: prev.education.filter((_, i) => i !== index),
        }));
      };
    
      const addCertification = () => {
        setResumeData((prev) => ({
          ...prev,
          certifications: [
            ...prev.certifications,
            { title: "", issuer: "", year: new Date('2024-04-05') },
          ],
        }));
      };
    
      const removeCertification = (index: number) => {
        setResumeData((prev) => ({
          ...prev,
          certifications: prev.certifications.filter((_, i) => i !== index),
        }));
      };
    
      const addSkill = (type: 'technical' | 'soft', skill: string | string[]) => {
        if (!Array.isArray(skill)) {
          setResumeData((prev) => ({
            ...prev,
            skills: {
              ...prev.skills,
              [type]: [...prev.skills[type], skill],
            },
          }));
          if (type === 'technical') setNewTechSkill("");
          else setNewSoftSkill("");
        }
        else{
          setResumeData((prev)=>{
            return {...prev,skills:{
              ...prev.skills,
            [type]:prev.skills
            }}
             
          }
        )
          
        }
       
      };
    
      const removeSkill = (type: 'technical' | 'soft', index: number) => {
        setResumeData((prev) => ({
          ...prev,
          skills: {
            ...prev.skills,
            [type]: prev.skills[type].filter((_, i) => i !== index),
          },
        }));
      };
     const addTextColor=(color:string)=>{
        setResumeData((prev)=>({
          ...prev,color:{
            ...prev.color,
            textColor:color
          }
        }))
      }
    const addAccentColor=(color:string)=>{
      setResumeData((prev)=>({
        ...prev,color:{...prev.color,
          accentColor:color
        }
      }))
    }

  return {
    resumeData,
    handleChange,
    removeSkill,
    addSkill,
    removeCertification,
    addCertification,
    removeEducation,
    addEducation,
    removeBulletPoint,
    addBulletPoint,
    removeExperience,
    addExperience,
    updateArrayItem,
    newTechSkill,
    newSoftSkill,
    setNewTechSkill,
    setNewSoftSkill,
    addTextColor,
    addAccentColor,
    setResumeData,
    stringifiedFields
    
    
  }
}

export default useResumeData
