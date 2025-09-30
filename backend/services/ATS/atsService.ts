import ATS from "../../model/ATS/ATS";
import HttpException from "../../error/Error";
import mongoose from "mongoose";
import ATS_SchemaInterface from "../../interfaces/atsInterface";
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
  

    




}
export default ATS_Service