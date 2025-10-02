export const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // delay between each child
    },
  },
};
export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
export function scoreRingColor(score: number) {
  if (score >= 80) return "from-emerald-500";
  if (score >= 60) return "from-amber-500";
  return "from-rose-500";
}
