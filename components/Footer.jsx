"use client";
import Link from "next/link";
import { toast } from "sonner";
import { TbAperture } from "react-icons/tb";
import { FaXTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { CATEGORIES } from "@/lib/constants";

export default function Footer() {
  const subscribe = (e) => {
    e.preventDefault();
    toast.success("Thanks for subscribing to StudioSpace updates");
    e.target.reset();
  };
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold"><TbAperture className="text-primary" size={30} /> StudioSpace</Link>
          <p className="mt-3 text-sm text-base-content/70">Our mission is to put every creator in the right room — book photo, film, podcast and music spaces from people who love them.</p>
          <div className="flex gap-3 mt-4 text-lg">
            <a href="https://x.com" aria-label="X" target="_blank"><FaXTwitter /></a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank"><FaInstagram /></a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank"><FaFacebookF /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank"><FaLinkedinIn /></a>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/studios">Explore Studios</Link></li>
            <li><Link href="/how-it-works">How It Works</Link></li>
            <li><Link href="/about">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (<li key={c}><Link href={`/studios?category=${encodeURIComponent(c)}`}>{c}</Link></li>))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Newsletter</h3>
          <form onSubmit={subscribe} className="join w-full">
            <input type="email" required placeholder="Your email" className="input input-bordered join-item w-full" />
            <button className="btn btn-primary join-item">Join</button>
          </form>
        </div>
      </div>
      <div className="text-center text-sm py-4 border-t border-base-300 text-base-content/60">
        © 2026 StudioSpace. All rights reserved. Use of this site is subject to our Terms of Service and Privacy Policy.
      </div>
    </footer>
  );
}
