"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Client-side authentication session clean execute karein
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh(); // Framework router state clear caches reload
          },
        },
      });
    } catch (error) {
      console.error("Client signout click runtime failure:", error);
      alert("Logout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded text-sm font-medium transition cursor-pointer disabled:bg-red-400"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
