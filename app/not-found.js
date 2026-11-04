import Link from "next/link";
import { TbAperture } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative text-primary">
        <TbAperture size={140} />
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-base-content">404</span>
      </div>
      <h1 className="section-title mt-6">This set is empty</h1>
      <p className="section-sub">The page you are looking for has wrapped up and left the studio.</p>
      <Link href="/" className="btn btn-primary mt-6">Return to Home</Link>
    </div>
  );
}
