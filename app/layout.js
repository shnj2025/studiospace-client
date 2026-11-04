import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JwtSync from "@/components/JwtSync";

export const metadata = {
  title: "StudioSpace — Book Creative Studios by the Hour",
  description: "Peer-to-peer marketplace for photo studios, sound stages, podcast rooms and music suites.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-base-100 text-base-content min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <JwtSync />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
