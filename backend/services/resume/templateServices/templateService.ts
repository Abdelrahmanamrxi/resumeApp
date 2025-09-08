import MinimalProfessional from "./minimalProfessional";
import ModernMinimalist from "./modernMinimalist";
import ResumeDataInterface from "../../../interfaces/resumeInterface";
import { TemplateProduct } from "../../../interfaces/resumeInterface";
import ModernColumn from "./modernTwoColumn";
import HttpException from "../../../error/Error";
import ModernProfessional from "./modernProfessional";

class TemplateService  {
    static getTemplate(resumeData:ResumeDataInterface):string{
      const {resumeType}=resumeData
        let factory:string
        switch(resumeType){
            case 'minimalProfessional':
                factory=new MinimalProfessional(resumeData).getTemplate()
                break
            case 'modernMinimalist':
                factory=new ModernMinimalist(resumeData).getTemplate()
                break
            case 'modernProfessional':
                factory=new ModernProfessional(resumeData).getTemplate()
                break
            case 'modernTwoColumn':
                factory=new ModernColumn(resumeData).getTemplate()
                break
            default: throw new HttpException("Resume Type Is not Provided",400)
        }  
        return factory
    }

}
export default TemplateService



