"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import SocialLogin from "@/components/SocialLogin";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const password = f.get("password");
    let msg = "";
    if (!/[A-Z]/.test(password)) msg = "Password must have an uppercase letter";
    else if (!/[a-z]/.test(password)) msg = "Password must have a lowercase letter";
    else if (password.length < 6) msg = "Password must be at least 6 characters";
    if (msg) { setError(msg); toast.error(msg); return; }

    setError("");
    setBusy(true);
    const { error } = await authClient.signUp.email({ name: f.get("name"), email: f.get("email"), password, image: f.get("photo") });
    if (error) {
      setError(error.message || "Registration failed");
      toast.error(error.message || "Registration failed");
      setBusy(false);
      return;
    }
    await authClient.signOut(); // send the user to Login after registering
    toast.success("Account created. Please log in");
    router.push("/login");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 border border-base-300">
        <form onSubmit={submit} className="card-body">
          <h1 className="section-title">Register</h1>
          <input name="name" required placeholder="Name" className="input input-bordered w-full" />
          <input name="email" type="email" required placeholder="Email" className="input input-bordered w-full" />
          <input name="photo" type="url" required placeholder="Photo URL" className="input input-bordered w-full" />
          <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full" />
          {error && <p className="text-error text-sm">{error}</p>}
          <button disabled={busy} className="btn btn-primary">{busy ? "Creating account…" : "Register"}</button>
          <div className="divider">or</div>
          <SocialLogin />
          <p className="text-sm text-center mt-2">Already have an account? <Link href="/login" className="text-primary font-semibold">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
