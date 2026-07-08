"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/", // Success redirect location
      },
      {
        onSuccess: () => {
          setSuccess("Login successful! Redirecting...");
          router.push("/");
          router.refresh(); // Framework token dynamically verify karke header badal dega
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Invalid email or password.");
          setIsPending(false);
        },
      },
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="mt-1 w-full rounded-md border border-gray-300 sm:text-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="mt-1 w-full rounded-md border border-gray-300 sm:text-sm p-2"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      {success && (
        <p className="mt-4 text-green-600 font-semibold">{success}</p>
      )}
    </div>
  );
};

export default LoginForm;
