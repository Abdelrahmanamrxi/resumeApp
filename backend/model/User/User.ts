import mongoose, { Types } from "mongoose";
import UserModel from "../../interfaces/userInterface";

const userSchema=new mongoose.Schema<UserModel>({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(v){
             return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            },
            message:'Invalid Email Format'
        }
    },
    password:{
        type:String,
        validate:{
            validator:function(v:string){
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(v);
            },
            message:"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        }
    },
    providerId:String,
    role:{
        type:String,
        enum:['user','admin'],
        required:true
    },
    authProvider:{
        type:String,
        enum:['google','local'],
        required:true
    },
    profileImage:String,
    isVerified:{
        type:Boolean,
        required:true
    },
    subscriptionDetails:{
        plan:{
            type:String,
            required:true,
            enum:['free','premium',"pro"],
            default:'free'
        },
        paidAt:{
            type:Date,
           
        },
        expiresAt:{
            type:Date,
        }
    },



},{timestamps:true})

const User=mongoose.model<UserModel>('User',userSchema)
export default User
export {UserModel}