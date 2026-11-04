"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`;
const slides = [
  { image: img("photo-1598488035139-bdbb2231ce04"), title: "Find the room your next shoot deserves", text: "Cyc walls, soft boxes and clean white space — booked by the hour." },
  { image: img("photo-1516280440614-37939bbacd81"), title: "Sound stages without the studio contract", text: "Full lighting grids and soundproofed floors for films, ads and music videos." },
  { image: img("photo-1590602847861-f357a9332bbc"), title: "Record your podcast in a room that sounds right", text: "Treated rooms with mics, headphones and fast Wi-Fi, ready when you arrive." },
];

export default function HeroSlider() {
  return (
    <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4500 }} pagination={{ clickable: true }} loop className="h-[70vh] min-h-[460px]">
      {slides.map((s) => (
        <SwiperSlide key={s.title}>
          <div className="h-full w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${s.image})` }}>
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">{s.title}</h1>
              <p className="mt-4 text-lg max-w-xl text-white/85">{s.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
                <Link href="/studios" className="btn btn-outline text-white border-white hover:bg-white hover:text-black">Host Your Space</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
