// Shared Recharts animation props so every chart in the app enters
// consistently instead of each component hardcoding its own timing.
export const chartEnterProps = {
  isAnimationActive: true,
  animationDuration: 400,
  animationEasing: "ease-out" as const,
};
