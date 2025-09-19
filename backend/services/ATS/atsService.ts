import ATS from "../../model/ATS/ATS";
import HttpException from "../../error/Error";
import mongoose from "mongoose";
class ATS_Service {
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
    async getAllATS(userId:string | mongoose.Types.ObjectId){
        try{
            let ats=await ATS.find({userId})
            if(ats) return ats
            else return null
        }
        catch(err){
            throw new HttpException('Internal Server Error')
        }
    }
  

    




}
export default ATS_Service