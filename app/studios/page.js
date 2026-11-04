"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import StudioCard from "@/components/StudioCard";
import { CardSkeletons } from "@/components/Spinner";
import EmptyState from "@/components/EmptyState";

function Explore() {
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [studios, setStudios] = useState(null);

  useEffect(() => {
    setStudios(null);
    const t = setTimeout(() => {
      const q = new URLSearchParams({ category, search, sort }).toString();
      api(`/api/studios?${q}`).then(setStudios).catch(() => setStudios([]));
    }, 300);
    return () => clearTimeout(t);
  }, [category, search, sort]);

  return (
    <div className="page-wrap">
      <h1 className="section-title">Explore Studios</h1>
      <p className="section-sub">Search, filter and find a space that fits your shoot.</p>
      <div className="grid gap-3 md:grid-cols-3 mt-6">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by studio name" className="input input-bordered w-full" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-full">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered w-full">
          <option value="">Newest first</option>
          <option value="rating">Top rated</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>
      <div className="mt-8">
        {studios === null ? <CardSkeletons /> : studios.length === 0 ? (
          <EmptyState title="No studios match your search" text="Try a different name or category, or list your own space." href="/add-studio" cta="Add New Studio" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{studios.map((s) => <StudioCard key={s._id} studio={s} />)}</div>
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() {
  return <Suspense fallback={<CardSkeletons />}><Explore /></Suspense>;
}
