import ATS from "../../model/ATS/ATS";
import HttpException from "../../error/Error";
import mongoose from "mongoose";
import ATS_SchemaInterface from "../../interfaces/atsInterface";
import CloudinaryService from "../cloudinary/cloudinaryService";
import ParseService from "../parseText/parseService";

import OpenApiService from "../openApi/openapiService";
class ATS_Service {
    constructor(private cloudinaryService:CloudinaryService,private parseService:ParseService,private openApiService:OpenApiService){}
    async getLatestATSResults(userId:string){
        try{
            let ats=await ATS.findOne({userId}).sort({createdAt:-1}).exec()
            if(ats)
            return ats
            else return null
        }
        catch(err){
            throw new HttpException('Error While Fetching Latest ATS Results')
        }
    }
    async getATSResultService(userId:string,_id:mongoose.Types.ObjectId | string) {
        try{
            
            let ats=await ATS.findOne({userId,_id})
            if(ats) return ats
            else return null
        }
        catch(err){
            console.log(err)
            throw new HttpException('Error While Fetching ATS Data')
        }
    }
    async getAllATS(userId:string | mongoose.Types.ObjectId, filter:'score' | 'new' |'none'){
        try{
            let ats
            if(filter==='none'){
              ats=await ATS.find({userId})
            }
            if(filter==="score"){
                 ats=await ATS.find({userId}).sort({matchScore:-1})
            }
            if(filter==="new"){
                 ats=await ATS.find({userId}).sort({createdAt:-1})
            }
            if(ats) return ats
            else return null
        }
        catch(err){
            throw new HttpException('Internal Server Error')
        }
    }
    async AnalyzePDFService(file:Express.Multer.File,mimetype:string,jobDescription:string,userId:string){
            try{
                const text=await ParseService.getExtractedText(file.buffer,mimetype)
                
                const response:ATS_SchemaInterface= await this.openApiService.generateAIAnaylsis(text,jobDescription)
    
                const{strengths,weakness,missingKeywords,foundKeywords,sections,metrics,recommendations,verdict,matchScore}=response
    
                const public_url=await this.cloudinaryService.UploadToCloudinary(file.buffer,userId)
    
                let ats=await ATS.create({
                    matchScore,
                    strengths,
                    weakness,
                    missingKeywords,
                    foundKeywords,
                    sections,
                    metrics,
                    recommendations,
                    verdict
                    ,userId:userId,
                    jobDescription,
                    fileDetails:{
                    fileName:file.originalname,
                    mimeType:mimetype,
                    fileUrl:public_url,
                    parsedText:text
                }})
                await ats.save()
                return ats._id
            }
            catch(err){
                console.log(err)
                throw new HttpException('Error While Analyzing Resume')
            }
        }
  

    




}
export default ATS_Service