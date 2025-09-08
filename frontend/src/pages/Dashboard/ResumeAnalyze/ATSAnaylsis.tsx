import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "../../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {motion} from 'framer-motion'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CheckCircle2, XCircle, Lightbulb, ShieldCheck, Target, FileCheck, AlertTriangle, ListChecks, BarChart2,ChevronLeft } from "lucide-react";
import api from "@/middleware/interceptor";
import { AxiosError } from "axios";


// -------------------- Types ---------------------
export type ATSResult = {
  matchScore: number; // 0..100
  strengths: string[];
  weakness: string[]; // note: key name matches your schema
  missingKeywords: string[];
  verdict: "Strong Match" | "Moderate Match" | "Weak Match";
  recommendations: string[];
  sections: {
    education: boolean;
    experience: boolean;
    certifications: boolean;
    skills: {
      tech: boolean;
      soft: boolean;
    };
  };
  metrics?: {
    pageCount: number;
    wordCount: number;
    metricRecommendation?: string;
  };
  foundKeywords: string[];
};

// ===================== Helpers =====================
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // delay between each child
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
function verdictStyles(v: ATSResult["verdict"]) {
  switch (v) {
    case "Strong Match":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Moderate Match":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-rose-50 text-rose-700 border-rose-200";
  }
}

function scoreRingColor(score: number) {
  if (score >= 80) return "from-emerald-500";
  if (score >= 60) return "from-amber-500";
  return "from-rose-500";
}

// Circular progress using conic-gradient + centered number
const ScoreDonut: React.FC<{ score: number; size?: number }> = ({ score, size = 140 }) => {
  const clamped = Math.max(0, Math.min(100, score));
  const angle = (clamped / 100) * 360;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr ${scoreRingColor(clamped)} to-transparent`}
        style={{ mask: `conic-gradient(#000 ${angle}deg, transparent ${angle}deg)` }}
      />
      <div className="absolute inset-2 rounded-full bg-white shadow-inner" />
      <div className="relative text-center">
        <div className="text-4xl font-bold">{clamped}</div>
        <div className="text-sm text-muted-foreground -mt-1">Match</div>
      </div>
    </div>
  );
};

const Pill: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${className}`}>{children}</span>
);

const SectionRow: React.FC<{ label: string; ok: boolean }> = ({ label, ok }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2">
      {ok ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
      <span className="text-sm">{label}</span>
    </div>
    <Badge variant={ok ? "secondary" : "destructive"} className="text-xs">{ok ? "Present" : "Missing"}</Badge>
  </div>
);

// ===================== Main Component =====================




 function ATSAnalysis() {
    const[data,setData]=useState<ATSResult>()
    const {id:_id}=useParams() 
   
    const[isLoading,setLoading]=useState<boolean>(false)
    const[error,setError]=useState<string>()
    
    const navigate=useNavigate()

    const FetchATSData=async()=>{
      try{
        setLoading(true)
        setError('')
        const response=await api.get(`/ats/results/${_id}`) 
        setData(response.data)
        setLoading(false)
      }
      catch(err){
        
        if(err instanceof AxiosError && err.response){
          setError(err.response.data.message)
          setLoading(false)
        }
      }
    
  }

  useEffect(()=>{
    FetchATSData()
  },[])
  
  if(error) return (
    <div className="">
    <button onClick={()=>{navigate(-1)}} className="p-4 flex-row flex gap-2 items-center hover:underline cursor-pointer"><ChevronLeft/> Back</button>
    <div className="flex mt-24 items-center  justify-center h-full">
    <p className="text-lg text-red-700 font-mono">{error}</p>
    </div>
    </div>
 )
  
  if(!data || isLoading) return <Loading message="Fetching ATS results please hold on..."/>


  const { matchScore, verdict, strengths, weakness, missingKeywords, foundKeywords, recommendations, sections, metrics } = data ;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b mt-5 from-white to-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold font-sans tracking-tight">ATS Resume Analysis</h1>
            <p className="text-sm text-muted-foreground mt-1">Instant audit of your resume vs. the job description.</p>
          </div>
          <Pill className={`${verdictStyles(verdict)}`}>{verdict}</Pill>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Target className="w-4 h-4" /> Match Score</CardTitle>
            </CardHeader>
            <CardContent className="grid place-items-center">
              <ScoreDonut score={matchScore} />
              {metrics && (
                <div className="w-full mt-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground"><span>Word Count</span><span>{metrics.wordCount ?? "—"}</span></div>
                  <Progress className="mt-2" value={Math.min(100, (metrics.wordCount / 1000) * 100)} />
                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground"><span>Pages</span><span>{metrics.pageCount}</span></div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><BarChart2 className="w-4 h-4" /> Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Found Keywords ({foundKeywords.length})</h3>
                <ScrollArea className="h-32 rounded-md border p-3 bg-white">
                  <div className="flex flex-wrap gap-2">
                    {foundKeywords.map((k, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{k}</Badge>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Missing Keywords ({missingKeywords.length})</h3>
                <ScrollArea className="h-32 rounded-md border p-3 bg-white">
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((k, i) => (
                      <Badge key={i} variant="destructive" className="text-xs">{k}</Badge>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Strengths & Gaps</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="strengths">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="strengths" className="flex cursor-pointer items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Strengths</TabsTrigger>
                  <TabsTrigger value="weakness" className="flex cursor-pointer items-center gap-2"><AlertTriangle className="w-4 h-4" /> Weaknesses</TabsTrigger>
                </TabsList>
                <TabsContent value="strengths" className="mt-4">
                    <motion.ul
                    variants={listVariants}
                     initial="hidden"
                    animate="visible"
                    className="space-y-2">
              {strengths.map((s, i) => (
              <motion.li
              key={i}
              variants={itemVariants}
              className="flex flex-row mt-5  gap-2">
      <CheckCircle2  className="shrink-0 text-emerald-600" />
      <span className="text-sm leading-relaxed">{s}</span></motion.li>))}
              </motion.ul>
                </TabsContent>
                <TabsContent value="weakness" className="mt-4 ">
                  <motion.ul 
                  variants={listVariants}
                   initial="hidden"
                   animate="visible"
                  className="space-y-2 ">
                    {weakness.map((w, i) => (
                      <motion.li variants={itemVariants} key={i} className="flex mt-5 items-center flex-row gap-2"><XCircle className="shrink-0 text-rose-600" /><span className="text-sm leading-relaxed">{w}</span></motion.li>
                    ))}
                  </motion.ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><ListChecks className="w-4 h-4" /> Required Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <SectionRow label="Education" ok={sections.education} />
              <Separator />
              <SectionRow label="Experience" ok={sections.experience} />
              <Separator />
              <SectionRow label="Certifications" ok={sections.certifications} />
              <Separator />
              <SectionRow label="Skills (Tech)" ok={sections.skills.tech} />
              <Separator />
              <SectionRow label="Skills (Soft)" ok={sections.skills.soft} />
            </CardContent>
          </Card>
        </div>

        {/* Recommendations & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Lightbulb className="w-4 h-4" /> Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                {recommendations.map((r, i) => (
                  <li key={i} className="text-sm leading-relaxed">{r}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><FileCheck className="w-4 h-4" /> Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {metrics ? (
                <>
                  <div className="flex items-center justify-between text-sm"><span>Pages</span><span className="font-medium">{metrics.pageCount}</span></div>
                  <div className="flex items-center justify-between text-sm"><span>Word Count</span><span className="font-medium">{metrics.wordCount}</span></div>
                  {metrics.metricRecommendation && (
                    <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700 border">
                      <span className="font-medium">Tip:</span> {metrics.metricRecommendation}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-sm text-muted-foreground">No metrics provided.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ATSAnalysis)
