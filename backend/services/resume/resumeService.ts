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
import mongoose from "mongoose";
import { ResumeType } from "../../interfaces/resumeInterface";

class ResumeService<T extends ResumeDataInterface>{
    constructor(private cloudinaryService:CloudinaryService,private openApiService:OpenApiService){}

    private getResumeType(resumeData:T){
        return TemplateService.getTemplate(resumeData)
    }
   async SavePDFService(resumeData:T):Promise<void>{
        try{
            const {userId}=resumeData
            const template:string=this.getResumeType(resumeData)
            const browser=await puppeteer.launch()
            const page=await browser.newPage()
            await page.setContent(template,{waitUntil:'networkidle0'})
            const pdf= await page.pdf({
                format:'A4',
                printBackground:true
            })
            const public_id=await this.cloudinaryService.UploadToCloudinary(Buffer.from(pdf),userId)
            await browser.close()
            
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



}
export default ResumeService