import Link from "next/link";
import { FaStar, FaLocationDot } from "react-icons/fa6";

export default function StudioCard({ studio }) {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm h-full">
      <figure className="relative h-52 w-full">
        <img src={studio.image} alt={studio.title} className="h-52 w-full object-cover" />
        <span className="badge badge-primary absolute top-3 left-3">{studio.category}</span>
      </figure>
      <div className="card-body">
        <h3 className="card-title line-clamp-1">{studio.title}</h3>
        <p className="flex items-center gap-1 text-sm text-base-content/70"><FaLocationDot /> {studio.location}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-primary">${studio.hourlyRate} / hr</span>
          <span className="badge badge-outline gap-1"><FaStar className="text-warning" /> {studio.rating > 0 ? Number(studio.rating).toFixed(1) : "New"}</span>
        </div>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/studios/${studio._id}`} className="btn btn-primary w-full">View Details</Link>
        </div>
      </div>
    </div>
  );
}
