"use client";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function BookingModal({ studio, open, onClose, onBooked }) {
  const [form, setForm] = useState({ date: "", startTime: "", endTime: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const toMin = (t) => Number(t.split(":")[0]) * 60 + Number(t.split(":")[1]);
  const hours = form.startTime && form.endTime && form.endTime > form.startTime ? (toMin(form.endTime) - toMin(form.startTime)) / 60 : 0;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api("/api/bookings", { method: "POST", body: { studioId: studio._id, ...form } });
      toast.success("Booking request sent. Status: Pending");
      onBooked();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
    setBusy(false);
  };

  if (!open) return null;
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-xl">Book {studio.title}</h3>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <label className="form-control"><span className="label-text mb-1">Date</span>
            <input type="date" required min={new Date().toISOString().split("T")[0]} value={form.date} onChange={set("date")} className="input input-bordered w-full" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="form-control"><span className="label-text mb-1">Start time</span>
              <input type="time" required value={form.startTime} onChange={set("startTime")} className="input input-bordered w-full" /></label>
            <label className="form-control"><span className="label-text mb-1">End time</span>
              <input type="time" required value={form.endTime} onChange={set("endTime")} className="input input-bordered w-full" /></label>
          </div>
          <div className="bg-base-200 rounded-lg p-3 text-sm space-y-1">
            <p>Rate: ${studio.hourlyRate} / hr × {hours} hr = <b>${hours * studio.hourlyRate}</b></p>
            <p>Refundable security deposit: ${studio.securityDeposit}</p>
          </div>
          {error && <p className="text-error text-sm">{error}</p>}
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>Close</button>
            <button disabled={busy} className="btn btn-primary">{busy ? "Booking…" : "Confirm Booking"}</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
