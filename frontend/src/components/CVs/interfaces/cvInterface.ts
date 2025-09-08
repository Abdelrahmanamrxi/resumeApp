
export interface Experience {
  jobTitle: string;
  company: string;
  points: string[];
  from:Date,
  To:Date
}

export interface Education {
  degree: string;
  institution: string;
  from:Date;
  To:Date
}

export interface Certification {
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

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: Skills;
  color:Colors,
  resumeName?:string,
  resumeLink?:string
  resumeType?: ResumeType
}
export type ResumeType =
  | "modernMinimalist"
  | "modernProfessional"
  | "minimalProfessional"
  | "modernTwoColumn";

export type ResumeDataArray= "experiences" | "education" | "certifications"
