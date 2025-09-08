import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "../../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, XCircle, Lightbulb, ShieldCheck, Target, FileCheck, AlertTriangle, ListChecks, BarChart2 } from "lucide-react";

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
export default function ATSAnalysis() {
  const { matchScore, verdict, strengths, weakness, missingKeywords, foundKeywords, recommendations, sections, metrics } = data;

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
                  <TabsTrigger value="strengths" className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Strengths</TabsTrigger>
                  <TabsTrigger value="weakness" className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Weaknesses</TabsTrigger>
                </TabsList>
                <TabsContent value="strengths" className="mt-4">
                  <ul className="space-y-2">
                    {strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600" /><span className="text-sm leading-relaxed">{s}</span></li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="weakness" className="mt-4">
                  <ul className="space-y-2">
                    {weakness.map((w, i) => (
                      <li key={i} className="flex items-start gap-2"><XCircle className="w-4 h-4 mt-0.5 text-rose-600" /><span className="text-sm leading-relaxed">{w}</span></li>
                    ))}
                  </ul>
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


