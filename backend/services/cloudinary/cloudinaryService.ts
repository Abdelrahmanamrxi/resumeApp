import cloudinary from "../../config/cloudinary";
import mongoose from "mongoose";
class CloudinaryService {
    async UploadToCloudinary (pdfBuffer:Buffer,userId:mongoose.Types.ObjectId | string):Promise<string> {
        return new Promise((resolve,reject)=>{
            const result=cloudinary.uploader.upload_stream({
                type:'private',
                resource_type:'raw',
                folder:'user_pdfs',
                format:'pdf',
                public_id:`resumePDF-${userId}-${Date.now()}`,
                use_filename: true, 
                unique_filename: false 
            },
           (err,result)=>{
            if(err) return reject(err)
            else 
            if(result?.secure_url) resolve(result.secure_url)
        
        }
        )
        result.end(pdfBuffer)
        })
        }
        
        getSignedURL(public_id:string):string{  
            return cloudinary.url(public_id,{
                resource_type:'raw',
                type:'private',
                sign_url:true
            })

        }
    


}
export default CloudinaryService