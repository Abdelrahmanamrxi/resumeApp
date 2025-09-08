import jwt from 'jsonwebtoken'
import {UserModel} from '../../model/User/User'
function generateToken(user:UserModel){
    const accessToken=jwt.sign({
        _id:user._id,
        name:user.fullName,
        role:user.role,
        email:user.email
    },process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:'1h'})
    const refreshToken=jwt.sign({
        _id:user._id,
        name:user.fullName,
        role:user.role,
        email:user.email
    },process.env.REFRESH_TOKEN_SECRET as string,{expiresIn:'7d'})

    return {accessToken,refreshToken}
}
export default generateToken