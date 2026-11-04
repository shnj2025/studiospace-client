"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";
import Spinner from "@/components/Spinner";

export default function EditStudio() {
  const { id } = useParams();
  const router = useRouter();
  const { data } = useSession();
  const [studio, setStudio] = useState(null);

  useEffect(() => {
    api(`/api/studios/${id}`).then(setStudio).catch((e) => { toast.error(e.message); router.push("/my-listings"); });
  }, [id, router]);

  const save = async (body) => {
    try {
      await api(`/api/studios/${id}`, { method: "PUT", body });
      toast.success("Studio updated successfully");
      router.push("/my-listings");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <PrivateRoute>
      <div className="page-wrap max-w-4xl">
        <h1 className="section-title mb-6">Update Studio</h1>
        {studio ? <StudioForm initial={studio} user={{ name: studio.ownerName, email: studio.ownerEmail }} onSubmit={save} label="Update Studio" /> : <Spinner />}
      </div>
    </PrivateRoute>
  );
}
