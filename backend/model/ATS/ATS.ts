import mongoose from "mongoose";
import ATS_SchemaInterface from "../../interfaces/atsInterface";
const atsSchema=new mongoose.Schema<ATS_SchemaInterface>({
    userId:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    jobDescription:{type:String,required:true},
    fileDetails:{
        fileName:String,
        fileType:{type:String,enum:['docx','pdf'],default:'pdf'},
        parsedText:String,
        fileUrl:String
    },
   
        matchScore:{type:Number,min:0,max:100},
        strengths:{
            type:[String],
            required:true,
        },
         weakness:{
            type:[String],
            required:true,
        },
        missingKeywords:[String],
        foundKeywords:[String],
        recommendations:{
            type:[String],
            required:true
        }
    ,
    sections:{
        experience:Boolean,
        education:Boolean,
        skills:{
            tech:Boolean,
            soft:Boolean
        },
        certifications:Boolean,
        
    },
    metrics:{
        wordCount:Number,
        pageCount:Number,
        metricRecommendation:String
    },
  

},{timestamps:true})
const ATS=mongoose.model<ATS_SchemaInterface>('ATS',atsSchema)
export default ATS