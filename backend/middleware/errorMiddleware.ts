import HttpException from "../error/Error"
import { Response,NextFunction,Request } from "express"

const errorMiddleware=(err:HttpException,req:Request,res:Response,next:NextFunction)=>{
    const status=err.statusCode?err.statusCode:500
    const message=status===500? "Something went wrong Try again later." : err.message
    res.status(status).json({message:message,status})
}
export default errorMiddleware