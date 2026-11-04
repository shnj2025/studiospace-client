"use client";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";

// Keeps the HTTPOnly JWT cookie in sync with the login session (also after Google login / reload)
export default function JwtSync() {
  const { data } = useSession();
  const email = data?.user?.email;
  useEffect(() => {
    if (email) fetch("/api/jwt");
  }, [email]);
  return null;
}
