import mongoose from "mongoose";
import { Education } from "../../interfaces/resumeInterface";
const educationSchema=new mongoose.Schema<Education>({
    degree:{
        type:String,
        required:true
    },
    institution:{
        type:String,
        required:true
    },

        from:{type:Date},
        To:{type:Date}
    
},{_id:false})

export default educationSchema