"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/action/auth.actions";
// import { register } from "@/action/auth.action"; // 👈 use server action

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await register(formData); // 👈 call server action

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess("Registration successful! Redirecting...");
      // redirect is already handled in server action,
      // but you can still push here if needed:
      router.push("/login");
    }
  };

  return (
    <div className="w-80 mx-auto mt-10 p-4 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="mt-1 w-full rounded-md border border-gray-300 sm:text-sm p-2"
          />
        </div>

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
          disabled={loading}
          className="mt-3 w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 cursor-pointer"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="mt-3 text-red-600 font-semibold">{error}</p>}
      {success && (
        <p className="mt-3 text-green-600 font-semibold">{success}</p>
      )}
    </div>
  );
};

export default RegisterForm;
