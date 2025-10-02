import ResumeDataInterface from "../../interfaces/resumeInterface";
import Resume from "../../model/Resume/Resume";
import puppeteer from "puppeteer";
import TemplateService from "../template/templateService";
import HttpException from "../../error/Error";
import CloudinaryService from "../cloudinary/cloudinaryService";
import OpenApiService from "../openApi/openapiService";
import mongoose , {UpdateQuery,Document} from "mongoose";
import { flatten } from "flat";
import { ResumeType } from "../../interfaces/resumeInterface";
import JustDiffOp from "../../utils/customTypes";
import { UpdateDB } from "../../utils/updatedFields";


class ResumeService<T extends ResumeDataInterface>{
    constructor(private cloudinaryService:CloudinaryService,private openApiService:OpenApiService){}

    private getResumeType(resumeData:T){
        return TemplateService.getTemplate(resumeData)
    }
   async downloadPDFService(resumeData:T, userId:mongoose.Types.ObjectId | string):Promise<Uint8Array<ArrayBufferLike>>{
        try{
            
            const template:string=this.getResumeType(resumeData)
            const browser=await puppeteer.launch()
            const page=await browser.newPage()
            await page.setContent(template,{waitUntil:'networkidle0'})
            const pdf= await page.pdf({
                format:'A4',
                printBackground:true
            })
            await this.cloudinaryService.UploadToCloudinary(Buffer.from(pdf),userId)
            await browser.close()
            return pdf
            
        }
        catch(err){
            console.log(err)
            throw new HttpException('Unknown Error')
        }
            
    }
 
    async createResumeService(resumeData:T){
        try{
         
           const resume=await Resume.create(resumeData)
           await resume.save()
           return {resumeId:resume._id,resumeType:resume.resumeType,resumeName:resume.resumeName}
        }
        catch(err){
            console.log(err)
            throw new HttpException('Error While Creating Your Resume')
        }
    }
    async getResumeService(_id:mongoose.Types.ObjectId | string,resumeId:mongoose.Types.ObjectId | string, resumeTemplate:ResumeType){
        try{
            const resume=await Resume.findOne({userId:_id,_id:resumeId,resumeType:resumeTemplate})
            return resume
        }
        catch(err){
            console.log(err)
            throw new HttpException('Error While Fetching Your Resume')
        }

    }   
    async getAllResumesService(_id:mongoose.Types.ObjectId | string){
        try{
            const resume=await Resume.find({userId:_id})
            return resume
        }
        catch(err){
            throw new HttpException("Unknown Error While Fetching Resumes")
        }
    }
       async generateResumeSection(text:string[] | string , jobDescription:string , type:'experience' | 'summary' |'skills'){
            try{
                const response=await this.openApiService.generateResumeCompletion(text,jobDescription,type)
                return response
            }
            catch(err){
                console.log(err)
                throw new HttpException('Error while generating AI response')
            }
    
        }   
        async SaveResumeService(changedFields:JustDiffOp[],userId:mongoose.Types.ObjectId | string , _id:mongoose.Types.ObjectId | string )
        : Promise<Document<Partial<ResumeType>> | null>
        {
               
            try{ 
                const updated=UpdateDB(changedFields)
                let newResume:(Document<Partial<ResumeType>>) | null=null
                if(updated.$set){
                       newResume=await Resume.findOneAndUpdate({userId: new mongoose.Types.ObjectId(userId) ,_id:new mongoose.Types.ObjectId(_id)},updated.$set,
                       {new:true}).select("-_id -userId")
                }
                if(updated.$pullAll){
                      newResume=await Resume.findOneAndUpdate({userId: new mongoose.Types.ObjectId(userId) ,_id:new mongoose.Types.ObjectId(_id)},updated.$pullAll,
                      {new:true}).select("-_id -userId")
                }
                
                 if(!newResume) throw new HttpException("Couldn't Find Resume To Update",404)
                return newResume
            }
            catch(error){
                 console.log(error)
                throw new HttpException('Error While Updating Resume')
            }
        }
        async DeleteResumeService(userId:mongoose.Types.ObjectId | string , _id:mongoose.Types.ObjectId | string ){
            try{
                let resume=await Resume.findOneAndDelete({userId,_id})
                return resume
            }
            catch(err){
                throw new HttpException('Error While Deleting Resume')
            }
            
        }
        


}
export default ResumeService