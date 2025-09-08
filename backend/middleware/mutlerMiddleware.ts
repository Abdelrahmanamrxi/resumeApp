import multer, { FileFilterCallback } from "multer";
import { Express , Request } from "express";
import HttpException from "../error/Error";
const storage=multer.memoryStorage()
const upload=multer({storage:storage,
    limits:{fileSize:5*1024*1024},
    fileFilter:(req:Request,file:Express.Multer.File,cb:FileFilterCallback)=>{
    try{
        const allowedFiles = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx file format
        ];  
        if(allowedFiles.includes(file.mimetype))
            cb(null,true)
        else
            cb(null,false)
    }
    catch(err){
        cb(new HttpException('Something happened while uploading your file.'))
    }
    }
})
export default upload