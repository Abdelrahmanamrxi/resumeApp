import ResumeDataInterface from "../../interfaces/resumeInterface";
import Resume from "../../model/Resume/Resume";
import puppeteer from "puppeteer";
import TemplateService from "./templateServices/templateService";
import HttpException from "../../error/Error";
import CloudinaryService from "../cloudinary/cloudinaryService";
import ParseService from "../parseText/parseService"
import OpenApiService from "../openApi/openapiService";
import ATS from "../../model/ATS/ATS";
import ATS_SchemaInterface from "../../interfaces/atsInterface";
import mongoose , {UpdateQuery} from "mongoose";
import { flatten } from "flat";
import { ResumeType } from "../../interfaces/resumeInterface";


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
        async SaveResumeService(changedFields:string | object,userId:mongoose.Types.ObjectId | string , _id:mongoose.Types.ObjectId | string ){
               
            try{
                console.log(changedFields)
                const extractedFields=Object.keys(changedFields)[0]
                const parsedFields=JSON.parse(extractedFields)
                console.log(parsedFields)
                if (parsedFields.experiences && Object.keys(parsedFields.experiences).length===0) 
                parsedFields.experiences = [];
                if(parsedFields.education && Object.keys(parsedFields.education).length===0)
                parsedFields.education=[]
            
                const updatedFields:Record<string,any>=flatten(parsedFields,{safe:true})
                
                const newResume=await Resume.findOneAndUpdate({userId: new mongoose.Types.ObjectId(userId) ,_id:new mongoose.Types.ObjectId(_id)},{$set:updatedFields},
                {new:true}).select("-_id -userId")
               
                if(!newResume) throw new HttpException("Couldn't Find Resume To Update",404)
                return newResume
            }
            catch(error){
                console.log(error)
                throw new HttpException('Error While Updating Resume')
            }

        }


}
export default ResumeService