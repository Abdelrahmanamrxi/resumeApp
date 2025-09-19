import { Request  , Response, NextFunction } from "express";
import ATS_Service from "../../services/ATS/atsService";
class ATSController{
     constructor(private atsService:ATS_Service){}
     async getLatestATSResults(req:Request,res:Response,next:NextFunction){
        try{
            const {_id}=req.user as {_id:string}
            const response=await this.atsService.getLatestATSResults(_id)
            if(response) return res.status(200).json(response)
            else return res.status(404).json({})
        }
        catch(err){
            next(err)
        }
     }
     async getATSResults(req:Request,res:Response,next:NextFunction){
        try{

            const {_id:userId}=req.user as {_id:string}
            
            const {id:_id}=req.params 
         
            const response=await this.atsService.getATSResultService(userId,_id)
            if(!response) return res.status(404).json({message:"Couldn't find any resume matching your criteria"})
            res.status(200).json(response)
        }
        catch(err){
            next(err)
        }
     }
     async getAllATS(req:Request,res:Response,next:NextFunction){
        try{
            const {_id:userId}=req.user as {_id:string}
            const response=await this.atsService.getAllATS(userId)
            if(!response) return res.status(404).json({message:'There are no ATS Scans Found.'})
                res.status(200).json(response)
        }
        catch(err){
            next(err)
        }
     }
     



}
export default ATSController