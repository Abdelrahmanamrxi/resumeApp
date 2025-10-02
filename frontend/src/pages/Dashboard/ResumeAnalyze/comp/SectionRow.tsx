import { CheckCircle2,XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SectionRow: React.FC<{ label: string; ok: boolean }> = ({ label, ok }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2">
      {ok ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
      <span className="text-sm">{label}</span>
    </div>
    <Badge variant={ok ? "secondary" : "destructive"} className="text-xs">{ok ? "Present" : "Missing"}</Badge>
  </div>
);
export default SectionRow