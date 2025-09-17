export interface ATS_SchemaInterface  {
    _id:string,
    userId:string,
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
    },
    createdAt:Date
}
