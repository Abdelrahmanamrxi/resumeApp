import mongoose, { Schema ,Document} from 'mongoose'
import ResumeDataInterface from '../../interfaces/resumeInterface'
import Experiences from './Experience'
import Education from './Education'
import Certification from './Certifications'
const resumeSchema=new mongoose.Schema<ResumeDataInterface>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        
    },
    phone:{
        type:String,
        
    },
    location:String,
    linkedin:String,
    summary:{
        type:String,
       
    },
    experiences:[Experiences],
    education:[Education],
    certifications:[Certification],
    skills:{
        soft:[String],
        technical:[String]
    },
    color:{
        textColor:String,
        accentColor:String
    },
    userId:{
        ref:'User',
        required:true,
        type:Schema.Types.ObjectId
    },
    resumeType:{
        type:String,
        enum:["modernMinimalist" , "modernProfessional" , "minimalProfessional" , 'modernTwoColumn','random'],
        required:true
    },
    resumeLink:{
        type:String,
    },
    resumeName:{
        type:String,
        required:true
    }

},{timestamps:true})
const Resume=mongoose.model('Resume',resumeSchema)
export default Resume