import mammoth from 'mammoth'
import pdf from 'pdf-parse'
import HttpException from '../../error/Error'

class ParseService {
    static async getExtractedText(file:Buffer,mimetype:string):Promise<string>{
        switch(mimetype){
            case 'application/pdf':
            const data=await pdf(file)
            return data.text
            break
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            const result=await mammoth.extractRawText({buffer:file})
            return result.value
            default:throw new HttpException("Error While Extracting Text")

        }
        
    }

}
export default ParseService