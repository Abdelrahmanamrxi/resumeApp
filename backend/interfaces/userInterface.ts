import { Types } from "mongoose"

interface UserModel {
    _id:Types.ObjectId
    fullName:string,
    email:string,
    password:string,
    role:'user' | 'admin',
    authProvider:'google' | 'local',
    profileImage?:'string',
    isVerified:boolean
    subscriptionDetails:{
        plan:'free' | 'premium' | 'pro',
        paidAt?:Date,
        expiresAt:Date
    },
    providerId:string
    createdAt:Date,
    updatedAt:Date
}

export interface UserRequestBody{
    email:string,
    fullName:string,
    password:string
}




export default UserModel