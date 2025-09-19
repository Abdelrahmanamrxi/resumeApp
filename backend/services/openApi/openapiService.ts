import OpenAI from "openai"
import { systemPrompt,systemTypePrompts } from "../../interfaces/atsInterface"
import Groq from "groq-sdk"
import HttpException from "../../error/Error"

class OpenApiService {
    public groq:Groq
     constructor(){
    this.groq=new Groq({
        apiKey:process.env.TESTKEY
    })
    }
    async generateResumeCompletion(text:string | string[],jobDescription:string, type:'experience' | "summary" | "skills"){
        const response=await this.groq.chat.completions.create({
            model:'openai/gpt-oss-120b',
            max_tokens:500,
            messages:[
                {
                    role:'system',
                    content:systemTypePrompts[type]
                },
                {
                    role:'user',
                    content:`Here's the candidate's resume text: ${text} And Here's the Job Description ${jobDescription}, Generate ${type} according to the following job description.`
                }
            ],
        })
        const content=response.choices[0].message.content
        if(!content) throw new HttpException("No content returned by the model",500)
        return JSON.parse(content)
    }





    async generateAIAnaylsis(text:string,jobDescription:string){
        const response=await this.groq.chat.completions.create({
            model:'openai/gpt-oss-120b',
            max_tokens:2000,
            messages:[
                {
                    role:'system',
                    content:systemPrompt
                },
                {
                    role:'user',
                    content:`Here's my Resume Data : ${text} Analyze it according to that Job Description : ${jobDescription} `
                }
            ],
            response_format:{
                type:'json_schema',
                json_schema:{
                    name:'ats_schema',
                    schema:{
                        type:"object",
                        properties:{
                            matchScore:{type:"number",minimum:0,maximum:100},
                            strengths:{type:"array",items:{type:'string'}},
                            weakness:{type:"array",items:{type:'string'}},
                            missingKeywords:{type:"array",items:{type:'string'}},
                            
                            verdict: { 
                            type: "string", 
                            enum: ["Strong Match", "Moderate Match", "Weak Match"]},
                            recommendations:{type:'array',items:{type:'string'}},
                            sections:{
                                properties:{
                                    education:{type:'boolean'},
                                    experience:{type:'boolean'},
                                    certifications:{type:'boolean'},
                                    skills:{
                                        type:'object',
                                        properties:{
                                            tech:{type:'boolean'},
                                            soft:{type:'boolean'}
                                        },
                                        required:['tech','soft']
                                    }
                                },
                                required:['education','experience','certifications','skills']

                            },
                            metrics:{
                                type:'object',
                                properties:{
                                    pageCount:{type:'number',min:1},
                                    wordCount:{type:'number',min:50},
                                    metricRecommendation:{type:'string'}
                                },
                                required:['pageCount','wordCount']
                            },
                            foundKeywords:{type:'array',items:{type:'string'}},
                           
                            
                        },
                        required:['foundKeywords',"missingKeywords",'matchScore','strengths','weakness','verdict','recommendations','sections']
                    }
                }
            }
            
        })
        
       const content = response.choices[0].message.content;
       if (!content) {
       throw new HttpException("No content returned from model",400);
        }

       return JSON.parse(content);
    }

}
export default OpenApiService