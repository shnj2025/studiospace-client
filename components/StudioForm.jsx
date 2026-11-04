"use client";
import { useState } from "react";
import { CATEGORIES, AMENITIES } from "@/lib/constants";

// Shared by Add Studio and Update Studio
export default function StudioForm({ initial = {}, user, onSubmit, label }) {
  const [amenities, setAmenities] = useState(initial.amenities || []);
  const [busy, setBusy] = useState(false);

  const toggle = (a) => setAmenities((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]));

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const gallery = (f.get("gallery") || "").split(",").map((s) => s.trim()).filter(Boolean);
    setBusy(true);
    await onSubmit({
      title: f.get("title"), category: f.get("category"), hourlyRate: f.get("hourlyRate"),
      securityDeposit: f.get("securityDeposit"), maxCapacity: f.get("maxCapacity"),
      location: f.get("location"), image: f.get("image"), gallery: [f.get("image"), ...gallery],
      amenities, overview: f.get("overview"),
    });
    setBusy(false);
  };

  const field = "input input-bordered w-full";
  return (
    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
      <label className="form-control md:col-span-2"><span className="label-text mb-1">Studio title</span>
        <input name="title" required defaultValue={initial.title} className={field} placeholder="e.g. Northlight Cyc Wall Studio" /></label>
      <label className="form-control"><span className="label-text mb-1">Category</span>
        <select name="category" required defaultValue={initial.category || ""} className="select select-bordered w-full">
          <option value="" disabled>Select a category</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select></label>
      <label className="form-control"><span className="label-text mb-1">Location / address</span>
        <input name="location" required defaultValue={initial.location} className={field} /></label>
      <label className="form-control"><span className="label-text mb-1">Hourly rate ($)</span>
        <input name="hourlyRate" type="number" min="1" required defaultValue={initial.hourlyRate} className={field} /></label>
      <label className="form-control"><span className="label-text mb-1">Security deposit ($)</span>
        <input name="securityDeposit" type="number" min="0" required defaultValue={initial.securityDeposit} className={field} /></label>
      <label className="form-control"><span className="label-text mb-1">Max capacity (people)</span>
        <input name="maxCapacity" type="number" min="1" required defaultValue={initial.maxCapacity} className={field} /></label>
      <label className="form-control"><span className="label-text mb-1">Image URL</span>
        <input name="image" type="url" required defaultValue={initial.image} className={field} placeholder="https://i.ibb.co/..." /></label>
      <label className="form-control md:col-span-2"><span className="label-text mb-1">More gallery image URLs (comma separated, optional)</span>
        <input name="gallery" defaultValue={(initial.gallery || []).slice(1).join(", ")} className={field} /></label>
      <div className="md:col-span-2">
        <span className="label-text">Amenities</span>
        <div className="flex flex-wrap gap-3 mt-2">
          {AMENITIES.map((a) => (
            <label key={a} className="label cursor-pointer gap-2 border border-base-300 rounded-lg px-3 py-1">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={amenities.includes(a)} onChange={() => toggle(a)} />
              <span className="label-text">{a}</span>
            </label>
          ))}
        </div>
      </div>
      <label className="form-control md:col-span-2"><span className="label-text mb-1">Detailed overview</span>
        <textarea name="overview" required rows={5} defaultValue={initial.overview} className="textarea textarea-bordered w-full" /></label>
      <label className="form-control"><span className="label-text mb-1">Host name</span>
        <input readOnly value={user?.name || ""} className={`${field} bg-base-200`} /></label>
      <label className="form-control"><span className="label-text mb-1">Host email</span>
        <input readOnly value={user?.email || ""} className={`${field} bg-base-200`} /></label>
      <button disabled={busy} className="btn btn-primary md:col-span-2">{busy ? "Saving…" : label}</button>
    </form>
  );
}
