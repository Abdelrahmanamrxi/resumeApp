import HttpException from "../../error/Error";
import UserService from "../../services/user/userService";
import { Request,Response,NextFunction } from "express";
import { UserRequestBody } from "../../interfaces/userInterface";
import generateToken from "../../services/token/tokenService";

class UserController{
    constructor(private userService:UserService){}

    async SignUp(req:Request,res:Response,next:NextFunction){
        try{
            const {email,password,fullName}=(req.body || {}) as UserRequestBody
            if (!email || !password || !fullName) {
               throw new HttpException('Missing Required Fields',400)
             }
            const createdUser=await this.userService.createUser(email,password,fullName)
            const {accessToken,refreshToken}=generateToken(createdUser)
            res.status(201).cookie('refreshToken',refreshToken,{
                   maxAge:7 * 24 * 60 * 60 * 1000,
                   sameSite:'strict',
                   httpOnly:true

            })
            .json(accessToken)
        }
        catch(err){
        console.log(err)
        next(err)
    }
}
  async LoginUser(req:Request,res:Response,next:NextFunction){
        try{
            const {email,password} = req.body as Omit<UserRequestBody ,'fullName'>
            const validatedUser=await this.userService.authenticateUser(email,password)
            if(validatedUser){
            const {accessToken,refreshToken}=generateToken(validatedUser)
              res.status(200).cookie('refreshToken',refreshToken,{
                   maxAge:7 * 24 * 60 * 60 * 1000,
                   sameSite:'strict',
                   httpOnly:true
            })
            .json(accessToken)
        }
       
    }
    catch(err){
        
        next(err)
    }
    }
}
export default UserController
