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

export default ATS_SchemaInterface