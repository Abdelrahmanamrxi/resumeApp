import mongoose, { Document } from "mongoose";
interface ATS_SchemaInterface extends Document {
    userId:mongoose.Types.ObjectId,
    jobDescription:string,
    fileDetails:{
        fileName:string,
        fileType:"pdf" | "docx",
        parsedText:string,
        fileUrl:string
    },
        foundKeywords:Array<string>
        matchScore:number,
        strengths:Array<string>,
        weakness:Array<string>
        missingKeywords:Array<string>,
        keywords:{
            found:Array<string>,
            missing:Array<string>
        },
        recommendations:Array<string>,
        verdict:'Strong Match' | "Weak Match" | "Moderate Match"
   
    sections:{
        education:boolean,
        experience:boolean,
        skills:{
            tech:boolean,
            soft:boolean
        },
        certifications:boolean
    },
    metrics?:{
        wordCount:number,
        pageCount:number,
        metricRecommendation:string
    }
}

export const systemPrompt = `
You are an ATS (Applicant Tracking System).
Your job is to compare a resume with a job description.
Always return valid JSON in the following structure:,
Do not include explanations or text outside of JSON.
`;

export const systemTypePrompts:Record<string,string>={
    summary: `You are a professional resume writer. 
    Write a concise and compelling professional summary (2-3 sentences) 
    that highlights the candidate's most relevant skills and experiences 
    for the job. Make it ATS-friendly and professional.`,

    experience: `You are a professional resume writer. 
    Based on the candidate's background and the job description, 
    write detailed work experience bullet points. 
    Focus on achievements, quantifiable results, and relevant skills. 
    Use strong action verbs and keep it ATS-friendly, SEND ONLY 3 Points Maximum

    Output format (JSON only):{
    "points": [
    "bullet point 1",
    "bullet point 2",
    "bullet point 3" ] `,

    skills: `You are a professional resume writer. 
    Create a list of key skills that align with the candidate's background 
    and match the requirements in the job description. 
    Keep the skills concise, ATS-friendly, relevant, And don't send me the skills i've sent you sent the one you generated SEND ONLY 4 - 3 Technical or Soft.
     
    Output format (JSON only):
    "skills": {
    "technical": ["skill1", "skill2", "skill3"],
    "soft": ["skill1", "skill2"]`
}


export default ATS_SchemaInterface