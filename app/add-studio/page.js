"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";

export default function AddStudio() {
  const router = useRouter();
  const { data } = useSession();

  const save = async (body) => {
    try {
      await api("/api/studios", { method: "POST", body });
      toast.success("Studio added successfully");
      router.push("/my-listings");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <PrivateRoute>
      <div className="page-wrap max-w-4xl">
        <h1 className="section-title mb-6">Add New Studio</h1>
        <StudioForm user={data?.user} onSubmit={save} label="Add Studio" />
      </div>
    </PrivateRoute>
  );
}
