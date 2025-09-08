import User from '../../model/User/User'
import HttpException from '../../error/Error'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'
import { isMongooseValidationError } from '../../utils/validationError'
import { validateEmail,validatePassword } from '../../utils/formatValidators'
class UserService {

    private async CheckIfUserExists(email:string){
            try{
                return await User.findOne({email})
             
            }
            catch(err){
                throw new Error('Unkown Error Please Try again Later')
            }
        } 
    
      
    async createUser(email:string,password:string,fullName:string){
        try{
            let userExists=await this.CheckIfUserExists(email)
            if(userExists)
            throw new HttpException('Email is already registered',409)
            else{
                if(!validatePassword(password)){
                     throw new HttpException("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",400 );
                }
                if(!validateEmail(email)){
                    throw new HttpException("Invalid Email Format",400)
                }
                let encryptedPassword=await bcrypt.hash(password,8)
                let user=await User.create({
                    email,
                    password:encryptedPassword,
                    fullName,
                    role:'user',
                    authProvider:'local',
                    isVerified:false,
                  
                })
                let createdUser=await user.save()
                return createdUser
            }
        }
        catch(err){
            if (err instanceof HttpException) throw err
                 if (isMongooseValidationError(err)) {
                  const messages = Object.values(err.errors).map(e => e.message);
                  throw new HttpException(messages.join(', '), 400);
                }
            throw new HttpException('Unknown Error While Signing Up');
        }
    }
     async authenticateUser(email:string,password:string){
        try{
            let user=await User.findOne({email})
            if(!user){
                throw new HttpException("Invalid email or password.",401)
            }
            else{    
                const passwordMatch=await bcrypt.compare(password,user.password)
                if(!passwordMatch){
                    throw new HttpException("Invalid email or password",401)
                }
                else return user
            }
           
        }
        catch(err){
            console.log(err)
            if(err instanceof HttpException)
            throw err
            else
            throw new HttpException('Unknown Error While Trying to Sign up')
        }

    }
    async getUser(id:Types.ObjectId){
        try{
            const user=await User.findById(id)
            if(!user)
            throw new HttpException("Couldn't find User",404)
            else return {email:user.email,name:user.fullName}
        }
        catch(err){
           if(err instanceof HttpException)
           throw err
           else throw new HttpException("Unknown Error While Trying to find User")
        }
        

    }

    
}
export default UserService