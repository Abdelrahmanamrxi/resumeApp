import type { ResumeData } from "../interfaces/cvInterface";
import modernProfessionalTemplate from '../../../assets/modernProfessional.jpg'
import minimalProfessionalTemplate from '../../../assets/minimalProfessional.jpg'
import modernMinimalTemplate from '../../../assets/modernMinimal.jpg'
import modernTwoColumn from '../../../assets/modernTwoColumn.jpg'
import { type ResumeType } from "../interfaces/cvInterface";
export const defaultData: ResumeData = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "0101233142",
  location: "New York, NY",
  linkedin: "linkedin.com/in/johndoe",
  summary:
    "Results-driven software developer with 5+ years of experience in building scalable web applications and delivering high-quality code.",
  experiences: [
    {
      jobTitle: "Software Engineer",
      company: "ABC Tech ",
      points: [
        "Developed and deployed web applications using React, Node.js, and MongoDB.",
        "Improved application performance by 25% through code optimization.",
      ],
       from:new Date('2023-01-30'),
       To:new Date('2023-04-05')
    }
   
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      institution: "University of Example",
      from: new Date('2018-10-05'),
      To:new Date('2022-06-04')
    },
  ],
  certifications: [],
  skills: {
    technical: ["JavaScript", "React", "Node.js", "MongoDB", "Git", "REST APIs"],
    soft: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"],
  },
  color:{
    accentColor:'black',
    textColor:'gray'
  }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
};
export const colors=['black','red','gray','orange','teal','zinc','green','yellow','navy','blue','white']

export  const getColor = (base: string, shade: number) => {
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
export const templates: { src: string; title: string; id: ResumeType }[] = [
  {
    src: minimalProfessionalTemplate,
    title: "Minimal Professional",
    id: "minimalProfessional",
  },
  {
    src: modernMinimalTemplate,
    title: "Modern Minimalist",
    id: "modernMinimalist",
  },
  {
    src: modernProfessionalTemplate,
    title: "Modern Professional",
    id: "modernProfessional",
  },
  {
    src: modernTwoColumn,
    title: "Modern Column",
    id: "modernTwoColumn", // ✅ fixed typo
  },
];