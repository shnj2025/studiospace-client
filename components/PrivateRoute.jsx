"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Spinner from "./Spinner";

// Waits for the session to load first, so reloading a private page never bounces to /login
export default function PrivateRoute({ children }) {
  const { data, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !data) router.replace(`/login?redirect=${pathname}`);
  }, [isPending, data, router, pathname]);

  if (isPending || !data) return <Spinner />;
  return children;
}
