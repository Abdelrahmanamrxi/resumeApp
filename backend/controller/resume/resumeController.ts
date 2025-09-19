import ResumeService from "../../services/resume/resumeService";
import ResumeDataInterface from "../../interfaces/resumeInterface";
import mongoose from "mongoose";
import { NextFunction,Request,Response } from "express";
import { ResumeType } from "../../interfaces/resumeInterface";
class ResumeController{
    constructor(private resumeService:ResumeService<ResumeDataInterface>){}

    async generatePDF(req:Request,res:Response,next:NextFunction){
        try{
            const resumeData=req.body as ResumeDataInterface
            const filePath=await this.resumeService.SavePDFService(resumeData)
            res.status(201).json({filePath})
        }
        catch(err){
            next(err)
        }
    }

    async AnalyzePDF(req:Request,res:Response,next:NextFunction){
        try{
            const file=req.file
            const {jobDescription}=req.body
            const {_id}=req.user as {_id:string}
            
            if(!file && !jobDescription) return res.status(400).json({message:"Please provide the file you want to analyze and a job description."})

            if(!jobDescription) return res.status(400).json({message:'Please provide a job description'})

            if(!file) return res.status(400).json({message:'Please provide a file for further anaylsis'})

            const response=await this.resumeService.AnalyzePDFService(file,file?.mimetype,jobDescription,_id)
            res.status(201).json({response})
        }
        catch(err){
            next(err)
        }
        
    }
    async createResume(req:Request,res:Response,next:NextFunction){
        try{
            const resumeData=req.body as ResumeDataInterface
           
            const {_id}=req.user as {_id:mongoose.Types.ObjectId}
            const {resumeName}=resumeData
            if(!resumeName) return res.status(400).json({message:"Please provide a name for your resume."})
            resumeData["userId"]=_id
         
             const response=await this.resumeService.createResumeService(resumeData)
             res.status(200).json({resumeName:response.resumeName,resumeId:response.resumeId,resumeType:response.resumeType})
        }
        catch(err){
            
            next(err)
        }
    }
    async getResume(req:Request,res:Response,next:NextFunction){
        const {_id}=req.user as {_id:mongoose.Types.ObjectId}
        const {resumeId}=req.params 
        const resumeType=req.query.resumeType as ResumeType 

        if(!resumeType) return res.status(400).json({message:"Please provide resume's template"})
        if(!resumeId) return res.status(400).json({message:"Please provide a resume ID to access the resume"})

        const response=await this.resumeService.getResumeService(_id,resumeId,resumeType)

        if(!response) return res.status(404).json({message:"Couldn't find resume matching your criteria."})
        res.status(200).json(response)
    }
    async getAllResumes(req:Request,res:Response,next:NextFunction){
        try{
            const {_id}=req.user as {_id:mongoose.Types.ObjectId | string}

            const response=await this.resumeService.getAllResumesService(_id)

            if(!response) return res.status(404).json({message:"No resumes have been found matching your criteria"})
            res.status(200).json(response)
        }
        catch(err){
            next(err)
        }
    }
    async generateResumeSection(req:Request,res:Response,next:NextFunction){
        try{
            const {text,jobDescription,type}=req.body as {text:string | string [] , jobDescription:string, type:'experience' | 'summary' | 'skills'}

            if(!jobDescription) return res.status(400).json({message:"Please provide a job description to match it with your resume."})
            if(!type) return res.status(400).json({message:'Please provide a type which you want to generate for'})

            const response=await this.resumeService.generateResumeSection(text,jobDescription,type)
            
        
            
            res.status(200).json(response)

        }
        catch(err){
            next(err)
        }


    }




}
export default ResumeController