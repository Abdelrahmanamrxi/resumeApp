import { Experience } from "../../interfaces/resumeInterface";
import mongoose from "mongoose";
const experienceSchema=new mongoose.Schema<Experience>({
    jobTitle:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    
        from:{type:Date},
        To:{type:Date}
   ,
    points:[{type:String}]
},{_id:false})
export default experienceSchema