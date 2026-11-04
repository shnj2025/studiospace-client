import Link from "next/link";
import { FaCamera, FaFilm, FaMicrophone, FaMusic, FaPalette, FaMagnifyingGlass, FaClock, FaCircleCheck, FaClapperboard, FaShieldHalved, FaScrewdriverWrench, FaHeadset } from "react-icons/fa6";
import HeroSlider from "@/components/HeroSlider";
import StudioCard from "@/components/StudioCard";
import { serverFetch } from "@/lib/api";

export const dynamic = "force-dynamic";

const categories = [
  { label: "Photo Studios", value: "Photo Studio", icon: FaCamera },
  { label: "Sound Stages", value: "Film Stage", icon: FaFilm },
  { label: "Podcast Rooms", value: "Podcast Lounge", icon: FaMicrophone },
  { label: "Music Suites", value: "Music Suite", icon: FaMusic },
  { label: "Art Workshops", value: "Workshop", icon: FaPalette },
];
const steps = [
  { icon: FaMagnifyingGlass, title: "Discover Spaces", text: "Search and filter studios by category, price and location." },
  { icon: FaClock, title: "Select Shoot Hours", text: "Pick your date and the exact hours you need." },
  { icon: FaCircleCheck, title: "Book Instantly", text: "Send your request and track its status in My Bookings." },
  { icon: FaClapperboard, title: "Create & Produce", text: "Arrive, set up and make something great." },
];
const guarantees = [
  { icon: FaShieldHalved, title: "Liability Protection", text: "Every booking is covered by our host and creator liability policy." },
  { icon: FaCircleCheck, title: "Verified Profiles", text: "Hosts and creators are identity-checked before they can book or list." },
  { icon: FaScrewdriverWrench, title: "Equipment Safety", text: "Gear and rigging are inspected by hosts and reported through the platform." },
  { icon: FaHeadset, title: "24/7 Host Support", text: "Our support team is on call for every shoot, day or night." },
];

export default async function Home() {
  const studios = await serverFetch("/api/studios?limit=6");
  return (
    <>
      <HeroSlider />

      <section className="page-wrap">
        <h2 className="section-title">Featured Studios</h2>
        <p className="section-sub">The newest and best-rated spaces on StudioSpace.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {studios.map((s) => <StudioCard key={s._id} studio={s} />)}
        </div>
        {studios.length === 0 && <p className="mt-8 text-base-content/70">No studios are listed yet. Be the first to add one.</p>}
        <div className="text-center mt-10"><Link href="/studios" className="btn btn-primary">Explore Studios</Link></div>
      </section>

      <section className="bg-base-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Browse by Studio Categories</h2>
          <p className="section-sub">Jump straight to the kind of space you need.</p>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-5 mt-8">
            {categories.map((c) => (
              <Link key={c.value} href={`/studios?category=${encodeURIComponent(c.value)}`} className="card bg-base-100 border border-base-300 hover:border-primary transition h-40">
                <div className="card-body items-center justify-center text-center">
                  <c.icon size={32} className="text-primary" />
                  <h3 className="font-bold">{c.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap">
        <h2 className="section-title">How Booking Works</h2>
        <p className="section-sub">From search to shoot in four steps.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {steps.map((s, i) => (
            <div key={s.title} className="card bg-base-100 border border-base-300 h-52">
              <div className="card-body">
                <s.icon size={28} className="text-primary" />
                <h3 className="font-bold text-lg">{i + 1}. {s.title}</h3>
                <p className="text-sm text-base-content/70">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-base-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Host Guarantee & Creator Support</h2>
          <p className="section-sub">Book and host with confidence.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {guarantees.map((g) => (
              <div key={g.title} className="card bg-base-100 border border-base-300 h-52">
                <div className="card-body">
                  <g.icon size={28} className="text-primary" />
                  <h3 className="font-bold text-lg">{g.title}</h3>
                  <p className="text-sm text-base-content/70">{g.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
