export const metadata = { title: "How It Works — StudioSpace" };
const items = [
  ["For creators", "Browse studios, open a listing, choose your date and hours, and send a booking request. The host confirms it and you get your slot."],
  ["For hosts", "Add your studio with photos, rates and amenities. Manage your listings, and confirm booking requests from the My Bookings page."],
  ["Fair scheduling", "Once a booking is confirmed, nobody else can book overlapping hours at the same studio on that day."],
];
export default function HowItWorks() {
  return (
    <div className="page-wrap max-w-3xl">
      <h1 className="section-title">How It Works</h1>
      <div className="mt-6 space-y-4">
        {items.map(([t, p]) => (
          <div key={t} className="card bg-base-100 border border-base-300"><div className="card-body"><h2 className="font-bold text-lg">{t}</h2><p className="text-base-content/80">{p}</p></div></div>
        ))}
      </div>
    </div>
  );
}
