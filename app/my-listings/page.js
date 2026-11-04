"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { api } from "@/lib/api";
import PrivateRoute from "@/components/PrivateRoute";
import EmptyState from "@/components/EmptyState";
import Spinner from "@/components/Spinner";

export default function MyListings() {
  const [studios, setStudios] = useState(null);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    api("/api/my-studios").then(setStudios).catch((e) => { toast.error(e.message); setStudios([]); });
  }, []);

  const remove = async () => {
    try {
      await api(`/api/studios/${target._id}`, { method: "DELETE" });
      setStudios(studios.filter((s) => s._id !== target._id));
      toast.success("Studio deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
    setTarget(null);
  };

  return (
    <PrivateRoute>
      <div className="page-wrap">
        <h1 className="section-title mb-6">My Studio Listings</h1>
        {studios === null ? <Spinner /> : studios.length === 0 ? (
          <EmptyState title="You have not listed a studio yet" text="Add your first space and start receiving bookings." href="/add-studio" cta="Add New Studio" />
        ) : (
          <div className="overflow-x-auto border border-base-300 rounded-box">
            <table className="table">
              <thead><tr><th>Studio</th><th>Category</th><th>Rate</th><th>Location</th><th>Actions</th></tr></thead>
              <tbody>
                {studios.map((s) => (
                  <tr key={s._id}>
                    <td><div className="flex items-center gap-3"><img src={s.image} alt={s.title} className="w-16 h-12 object-cover rounded" /><span className="font-semibold">{s.title}</span></div></td>
                    <td>{s.category}</td>
                    <td>${s.hourlyRate} / hr</td>
                    <td>{s.location}</td>
                    <td className="space-x-2 whitespace-nowrap">
                      <Link href={`/studios/edit/${s._id}`} className="btn btn-sm btn-outline btn-primary">Update</Link>
                      <button onClick={() => setTarget(s)} className="btn btn-sm btn-outline btn-error">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {target && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete this studio?</h3>
              <p className="py-3">“{target.title}” will be permanently removed. This cannot be undone.</p>
              <div className="modal-action">
                <button className="btn" onClick={() => setTarget(null)}>Keep Studio</button>
                <button className="btn btn-error" onClick={remove}>Delete Studio</button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </PrivateRoute>
  );
}
