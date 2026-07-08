"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import BlogForm from "@/components/BlogForm";

export default function CreateBlogPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    // Agar authentication confirmation resolve ho chuki hai aur session completely missing hai
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Server handshake latency resolution loader framework
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
        Validating authentication tracking parameters...
      </div>
    );
  }

  // Session safe condition verification execution tree block
  if (!session) return null;

  return (
    <div className="container mx-auto p-4">
      <BlogForm />
    </div>
  );
}
