import { scoreRingColor } from "../utils/helper";
import { useTransform,useMotionTemplate,useSpring,motion } from "framer-motion";
import { useEffect } from "react";


const ScoreDonut: React.FC<{ score: number; size?: number }> = ({ score, size = 140 }) => {
  const clamped = Math.max(0, Math.min(100, score));

  // animate value from 0 → score
  const progress = useSpring(0, { stiffness: 80, damping: 20 });

  // update when score changes
  useEffect(() => {
    progress.set(clamped);
  }, [clamped, progress]);

  // convert % → angle
  const angle = useTransform(progress, (p) => (p / 100) * 360);

  // conic-gradient mask
  const mask = useMotionTemplate`conic-gradient(#000 ${angle}deg, transparent ${angle}deg)`;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      {/* Animated circle */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr ${scoreRingColor(
          clamped
        )} to-transparent`}
        style={{
          mask,
          WebkitMask: mask, // Safari fix
        }}
      />

      {/* White inner circle */}
      <div className="absolute inset-2 rounded-full bg-white shadow-inner" />

      {/* Text */}
      <div className="relative text-center">
        <div className="text-4xl font-bold">{clamped}</div>
        <div className="text-sm text-muted-foreground -mt-1">Match</div>
      </div>
    </div>
  );
};
export default ScoreDonut