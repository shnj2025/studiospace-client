"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { TbAperture } from "react-icons/tb";
import { authClient, useSession } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = useSession();
  const user = data?.user;

  const logout = async () => {
    await authClient.signOut();
    await fetch("/api/jwt", { method: "DELETE" });
    toast.success("You have been logged out");
    router.push("/");
  };

  const navLinks = links.map((l) => (
    <li key={l.href}>
      <Link href={l.href} className={pathname === l.href ? "text-primary font-semibold border-b-2 border-primary rounded-none" : ""}>
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">{navLinks}</ul>
          </div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-base-content">
            <TbAperture className="text-primary" size={30} /> StudioSpace
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{navLinks}</ul>
        </div>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {isPending ? null : user ? (
            <div className="dropdown dropdown-end dropdown-hover">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-base-300">
                  {user.image ? <img src={user.image} alt={user.name} /> : <span className="flex h-full items-center justify-center font-bold">{user.name?.[0]}</span>}
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-1 z-10 p-2 shadow bg-base-100 border border-base-300 rounded-box w-56">
                <li className="menu-title text-base-content">{user.name}</li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/add-studio">Add New Studio</Link></li>
                <li><Link href="/my-listings">My Studio Listings</Link></li>
                <li><Link href="/my-bookings">My Bookings</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
              <Link href="/register" className="btn btn-outline btn-primary btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
