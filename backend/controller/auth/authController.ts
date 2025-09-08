import { NextFunction, Request , Response   } from "express";
import { Types } from "mongoose";
import jwt from 'jsonwebtoken'
import generateToken from "../../services/token/tokenService";
import HttpException from "../../error/Error";
import UserModel from "../../interfaces/userInterface";
import User from "../../model/User/User";

class AuthController {
       
    async refreshToken(req:Request,res:Response,next:NextFunction){
        const refreshToken=req.cookies.refreshToken
       
        if(!refreshToken)
        return res.status(401).json({message:'Unauthorized Access Please Login.', statusCode:401})
        else{
        try{   
            const payload=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET as string) as {
            _id:Types.ObjectId,
            name:string,
            role:'admin'|'user'
           }
        
           let user=await User.findById(payload._id)
        
           if(!user)
            return res.status(401).json({message:'Unauthorized Access Please Login.', statusCode:401})
           else{
               const { accessToken }=generateToken(user)
              
                res.status(201).json({accessToken})
            }
        }
            catch(err){
                return next(new HttpException('Something happened try again Later'))
            }
        }

    }
    handleGoogleCallback(req:Request,res:Response,next:NextFunction){
        try{
            let user = req.user as UserModel
            const { accessToken,refreshToken }=generateToken(user)
            res.cookie('refreshToken',refreshToken,{
                maxAge:7 * 24 * 60 * 60 * 1000,
                sameSite:'strict',
                httpOnly:true
            })
            res.redirect(`http://localhost:5173/login-redirect?accessToken=${accessToken}`)
            
        }
        catch(err){
            return next(new HttpException('Login Failed Please Try again later.'))
        }

    }

}
export default AuthController