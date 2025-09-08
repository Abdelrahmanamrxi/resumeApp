import mongoose from 'mongoose'
import { CertificationInterface } from '../../interfaces/resumeInterface'
const certificationSchema=new mongoose.Schema<CertificationInterface>({
    title:{
        type:String,
        required:true
    },
    issuer:{
        type:String,
        required:true
    },
    year:{
        type:Date,
        required:true
    }


},{_id:false})

export default certificationSchema
