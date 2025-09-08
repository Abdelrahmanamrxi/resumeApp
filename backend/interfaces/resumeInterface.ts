import mongoose from "mongoose";
import { Document } from "mongoose";
export interface Experience {
  jobTitle: string;
  company: string;
  points: string[],
  from:Date,
  To:Date
    
}
export interface Education {
  degree: string;
  institution: string;
    from:Date,
    To:Date
  
}

export interface CertificationInterface {
  title: string;
  issuer: string;
  year: Date;
}

export interface Skills {
  technical: string[];
  soft: string[];
}
export interface Colors {
  accentColor:string,
  textColor:string
}

 interface ResumeDataInterface extends Document {
  resumeName:string,
  name: string;
  email: string;
  phone: string;
  location?: string;
  linkedin?: string;
  summary: string;
  experiences?: Experience[];
  education: Education[];
  certifications?: CertificationInterface[];
  skills?: Skills;
  color:Colors
  userId:mongoose.Types.ObjectId
  resumeType:"modernMinimalist" | "modernProfessional" | "minimalProfessional" | 'modernTwoColumn' | "random"
  resumeLink:string,
}

export interface TemplateProduct {
    getTemplate():string,
}
export type ResumeType="modernMinimalist" | "modernProfessional" | "minimalProfessional" | 'modernTwoColumn' | "random"

export const getColor = (base: string, shade: number) => {
  const shades: Record<string, Record<number, string>> = {
    black: { 600: "#1f2937", 700: "#111827", 800: "#0f172a" },
    red:   { 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b" },
    gray:  { 600: "#4b5563", 700: "#374151", 800: "#1f2937" },
    orange:{ 600: "#ea580c", 700: "#c2410c", 800: "#9a3412" },
    teal:  { 600: "#0d9488", 700: "#0f766e", 800: "#115e59" },
    zinc:  { 600: "#52525b", 700: "#3f3f46", 800: "#27272a" },
    green: { 600: "#16a34a", 700: "#15803d", 800: "#166534" },
    yellow:{ 600: "#ca8a04", 700: "#a16207", 800: "#854d0e" },
    blue:  { 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af" },
    navy:  { 600: "#1e3a8a", 700: "#1e3a8a", 800: "#1e3a8a" },
    white: { 600: "#ffffff", 700: "#f9fafb", 800: "#f3f4f6" },
     
  };

  return shades[base]?.[shade] || "#000"; // fallback black
};


export default ResumeDataInterface
