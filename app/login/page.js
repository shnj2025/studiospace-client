"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import SocialLogin from "@/components/SocialLogin";

function LoginForm() {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") || "/";
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    setError("");
    setBusy(true);
    const { error } = await authClient.signIn.email({ email: f.get("email"), password: f.get("password") });
    if (error) {
      setError(error.message || "Invalid email or password");
      toast.error(error.message || "Invalid email or password");
      setBusy(false);
      return;
    }
    await fetch("/api/jwt");
    toast.success("Welcome back to StudioSpace");
    router.push(redirect);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 border border-base-300">
        <form onSubmit={submit} className="card-body">
          <h1 className="section-title">Login</h1>
          <input name="email" type="email" required placeholder="Email" className="input input-bordered w-full" />
          <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full" />
          <button type="button" onClick={() => toast.info("Password reset is not available yet")} className="text-sm text-primary text-left">Forgot Password?</button>
          {error && <p className="text-error text-sm">{error}</p>}
          <button disabled={busy} className="btn btn-primary">{busy ? "Logging in…" : "Login"}</button>
          <div className="divider">or</div>
          <SocialLogin callbackURL={redirect} />
          <p className="text-sm text-center mt-2">New to StudioSpace? <Link href="/register" className="text-primary font-semibold">Register</Link></p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
