import { Request,Response,NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { Types } from "mongoose"
import HttpException from "../error/Error"
const authMiddleware=(...allowedRoles:string[])=>{
   return (req:Request,res:Response,next:NextFunction)=>{
    try{
        const authHeaders=req.headers.authorization
        if(!authHeaders?.startsWith('Bearer')) return res.status(401).json({message:'Unauthorized Access'})
    else{
        const token=authHeaders.split(' ')[1]
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string) as {
            id:Types.ObjectId,
            role:'admin' | 'user',
            name:string
        }
        if(!allowedRoles.includes(decoded.role))
        return res.status(403).json({message:'Unauthorized Access'})
        req.user=decoded
        next()
    }
    }      
    catch(err){
        
        return next(new HttpException('Unknown Error Please try again later.',401))
    } 
        
    }
    }
    export default authMiddleware