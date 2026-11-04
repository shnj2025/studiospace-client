"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import PrivateRoute from "@/components/PrivateRoute";

export default function Dashboard() {
  const { data } = useSession();
  const [stats, setStats] = useState({ studios: 0, bookings: 0, pending: 0 });

  useEffect(() => {
    Promise.all([api("/api/my-studios"), api("/api/my-bookings")])
      .then(([s, b]) => setStats({ studios: s.length, bookings: b.length, pending: b.filter((x) => x.status === "Pending").length }))
      .catch(() => {});
  }, []);

  const cards = [
    ["My studio listings", stats.studios, "/my-listings"],
    ["My bookings", stats.bookings, "/my-bookings"],
    ["Pending bookings", stats.pending, "/my-bookings"],
  ];
  return (
    <PrivateRoute>
      <div className="page-wrap">
        <h1 className="section-title">Welcome, {data?.user?.name}</h1>
        <div className="grid gap-6 sm:grid-cols-3 mt-8">
          {cards.map(([label, n, href]) => (
            <Link key={label} href={href} className="card bg-base-100 border border-base-300 hover:border-primary transition">
              <div className="card-body"><p className="text-4xl font-bold text-primary">{n}</p><p>{label}</p></div>
            </Link>
          ))}
        </div>
        <Link href="/add-studio" className="btn btn-primary mt-8">Add New Studio</Link>
      </div>
    </PrivateRoute>
  );
}
