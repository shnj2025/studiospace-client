import Link from "next/link";
import { TbAperture } from "react-icons/tb";

export default function EmptyState({ title, text, href, cta }) {
  return (
    <div className="text-center py-20 border border-dashed border-base-300 rounded-box">
      <TbAperture size={56} className="mx-auto text-base-content/30" />
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-1 text-base-content/70">{text}</p>
      {href && <Link href={href} className="btn btn-primary mt-5">{cta}</Link>}
    </div>
  );
}
