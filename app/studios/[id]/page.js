"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaLocationDot, FaUsers } from "react-icons/fa6";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import Spinner from "@/components/Spinner";
import BookingModal from "@/components/BookingModal";
import EmptyState from "@/components/EmptyState";

export default function StudioDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data } = useSession();
  const [studio, setStudio] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api(`/api/studios/${id}`).then(setStudio).catch(() => setNotFound(true));
  }, [id]);

  const bookNow = () => {
    if (!data) {
      toast.error("Please log in to book a studio");
      router.push(`/login?redirect=/studios/${id}`);
      return;
    }
    setOpen(true);
  };

  if (notFound) return <div className="page-wrap"><EmptyState title="Studio not found" text="This listing may have been removed." href="/studios" cta="Explore Studios" /></div>;
  if (!studio) return <Spinner />;
  const images = studio.gallery?.length ? studio.gallery : [studio.image];

  return (
    <div className="page-wrap">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="rounded-box h-80 md:h-[420px]">
            {images.map((src, i) => (
              <SwiperSlide key={i}><img src={src} alt={`${studio.title} ${i + 1}`} className="h-full w-full object-cover" /></SwiperSlide>
            ))}
          </Swiper>
          <h2 className="font-bold text-xl mt-8">Overview</h2>
          <p className="mt-2 leading-relaxed text-base-content/80">{studio.overview}</p>
          <h2 className="font-bold text-xl mt-8">Amenities</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {studio.amenities?.map((a) => <span key={a} className="badge badge-outline p-3">{a}</span>)}
          </div>
          <h2 className="font-bold text-xl mt-8">Reviews</h2>
          <div className="mt-3 space-y-3">
            {studio.reviews?.length ? studio.reviews.map((r, i) => (
              <div key={i} className="border border-base-300 rounded-lg p-4">
                <p className="font-semibold">{r.name} <span className="text-warning inline-flex items-center gap-1 ml-2"><FaStar /> {r.rating}</span></p>
                <p className="text-sm text-base-content/80 mt-1">{r.comment}</p>
              </div>
            )) : <p className="text-base-content/70">No reviews yet. Be the first to book and review.</p>}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card bg-base-100 border border-base-300 sticky top-24">
            <div className="card-body">
              <span className="badge badge-primary">{studio.category}</span>
              <h1 className="text-3xl font-bold">{studio.title}</h1>
              <p className="flex items-center gap-2 text-base-content/70"><FaLocationDot /> {studio.location}</p>
              <p className="flex items-center gap-2 text-base-content/70"><FaUsers /> Up to {studio.maxCapacity} people</p>
              <p className="flex items-center gap-2"><FaStar className="text-warning" /> {studio.rating > 0 ? Number(studio.rating).toFixed(1) : "New"}</p>
              <p className="text-3xl font-bold text-primary">${studio.hourlyRate} <span className="text-base font-normal">/ hr</span></p>
              <p className="text-sm text-base-content/70">Security deposit: ${studio.securityDeposit}</p>
              <div className="divider my-1" />
              <p className="text-sm"><b>Host:</b> {studio.ownerName}</p>
              <p className="text-sm"><b>Contact:</b> {studio.ownerEmail}</p>
              <button onClick={bookNow} className="btn btn-primary mt-3">Book Workspace Now</button>
            </div>
          </div>
        </div>
      </div>
      <BookingModal studio={studio} open={open} onClose={() => setOpen(false)} onBooked={() => { setOpen(false); router.push("/my-bookings"); }} />
    </div>
  );
}
