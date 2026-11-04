"use client";
import { FaGoogle } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

export default function SocialLogin({ callbackURL = "/" }) {
  return (
    <button type="button" onClick={() => authClient.signIn.social({ provider: "google", callbackURL })} className="btn btn-outline w-full">
      <FaGoogle /> Continue with Google
    </button>
  );
}
