import { TbAperture } from "react-icons/tb";

export default function Spinner() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-primary">
      <TbAperture className="animate-spin" size={48} />
      <p className="text-sm text-base-content/60">Loading StudioSpace…</p>
    </div>
  );
}

export function CardSkeletons({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton h-96 w-full" />
      ))}
    </div>
  );
}
