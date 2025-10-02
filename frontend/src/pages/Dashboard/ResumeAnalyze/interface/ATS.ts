
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
