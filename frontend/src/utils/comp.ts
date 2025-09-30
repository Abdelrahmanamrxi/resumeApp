const components: { title: string; to: string; description: string }[] = [
  {
    title: "Start Building Your Resume",
    to: "/user/dashboard",
    description:
      "Quickly create a professional, ATS-friendly resume with the help of AI — no design skills needed.",
  },
  {
    title: "AI Resume Analyzer",
    to: "/user/dashboard/resume-analyze",
    description:
      "Analyze your resume for keyword optimization, formatting, and ATS compatibility to increase interview chances.",
  },
  {
    title: "Job Match Scoring",
    to: "/user/dashboard/resume-analyze",
    description:
      "Compare your resume against any job description and get a match score with personalized improvement tips.",
  },
];
export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      };

export function timeAgo(dateString: string | Date): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = (now.getTime() - date.getTime()) / 1000 // difference in seconds

  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  
  return date.toLocaleDateString() // fallback for older than a week
}






export default components