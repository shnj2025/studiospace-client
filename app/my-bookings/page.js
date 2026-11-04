"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import PrivateRoute from "@/components/PrivateRoute";
import EmptyState from "@/components/EmptyState";
import Spinner from "@/components/Spinner";

const badge = { Pending: "badge-warning", Confirmed: "badge-success", Completed: "badge-info", Cancelled: "badge-error" };

export default function MyBookings() {
  const [mine, setMine] = useState(null);
  const [requests, setRequests] = useState([]);
  const [target, setTarget] = useState(null);

  const load = () => {
    api("/api/my-bookings").then(setMine).catch((e) => { toast.error(e.message); setMine([]); });
    api("/api/host-bookings").then(setRequests).catch(() => {});
  };
  useEffect(load, []);

  const cancel = async () => {
    try {
      await api(`/api/bookings/${target._id}/cancel`, { method: "PATCH" });
      toast.success("Booking cancelled");
      load();
    } catch (err) { toast.error(err.message); }
    setTarget(null);
  };

  const setStatus = async (id, status) => {
    try {
      await api(`/api/bookings/${id}/status`, { method: "PATCH", body: { status } });
      toast.success(`Booking ${status.toLowerCase()}`);
      load();
    } catch (err) { toast.error(err.message); }
  };

  return (
    <PrivateRoute>
      <div className="page-wrap">
        <h1 className="section-title mb-6">My Bookings</h1>
        {mine === null ? <Spinner /> : mine.length === 0 ? (
          <EmptyState title="No bookings yet" text="Find a studio and reserve your first slot." href="/studios" cta="Explore Studios" />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {mine.map((b) => (
              <div key={b._id} className="card card-side bg-base-100 border border-base-300">
                <figure className="w-32 shrink-0"><img src={b.studioImage} alt={b.studioTitle} className="h-full w-full object-cover" /></figure>
                <div className="card-body p-4">
                  <h3 className="font-bold">{b.studioTitle}</h3>
                  <p className="text-sm">{b.date} • {b.startTime} – {b.endTime} ({b.hours} hr)</p>
                  <p className="text-sm font-semibold">Total: ${b.totalPrice}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`badge ${badge[b.status]}`}>{b.status}</span>
                    {b.status === "Pending" && <button onClick={() => setTarget(b)} className="btn btn-xs btn-outline btn-error">Cancel Booking</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {requests.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-14 mb-4">Booking Requests for My Studios</h2>
            <div className="overflow-x-auto border border-base-300 rounded-box">
              <table className="table">
                <thead><tr><th>Studio</th><th>Creator</th><th>Slot</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {requests.map((b) => (
                    <tr key={b._id}>
                      <td>{b.studioTitle}</td>
                      <td>{b.userName}</td>
                      <td>{b.date} {b.startTime}–{b.endTime}</td>
                      <td><span className={`badge ${badge[b.status]}`}>{b.status}</span></td>
                      <td>
                        {b.status === "Pending" && <button onClick={() => setStatus(b._id, "Confirmed")} className="btn btn-xs btn-success">Confirm</button>}
                        {b.status === "Confirmed" && <button onClick={() => setStatus(b._id, "Completed")} className="btn btn-xs btn-info">Mark Completed</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {target && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Cancel this booking?</h3>
              <p className="py-3">Your request for {target.studioTitle} on {target.date} will be cancelled.</p>
              <div className="modal-action">
                <button className="btn" onClick={() => setTarget(null)}>Keep Booking</button>
                <button className="btn btn-error" onClick={cancel}>Cancel Booking</button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </PrivateRoute>
  );
}
