"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

type BlogFormData = {
  title: string;
  description: string;
  content: string;
  category: string;
  image: string;
  tags: string;
};

export default function BlogForm() {
  const { register, handleSubmit, reset } = useForm<BlogFormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: BlogFormData) {
    setLoading(true);
    const slug = data.title.toLowerCase().replace(/\s+/g, "-");
    const tagsArray = data.tags
      ? data.tags.split(",").map((tag) => tag.trim())
      : [];

    // 🔥 CRITICAL FIX: Fetch ke andar 'credentials' attach kar diya hai

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 👈 browser storage cookie pass engine injection
      body: JSON.stringify({ ...data, slug, tags: tagsArray }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      alert(errData.error || "Failed to create blog");
      setLoading(false);
      return;
    }

    alert("Blog created successfully! 🎉");
    reset();
    router.push("/blogs");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white shadow-md p-6 rounded-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Post</h2>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Blog Title
        </label>
        <input
          {...register("title", { required: true })}
          placeholder="Enter a catchy title"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Short Description
        </label>
        <input
          {...register("description")}
          placeholder="Brief summary of your blog post"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Detailed Content
        </label>
        <textarea
          {...register("content", { required: true })}
          placeholder="Write your story here..."
          className="w-full border p-2 rounded h-40 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Category
          </label>
          <input
            {...register("category")}
            placeholder="e.g. Technology"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Tags (Comma Separated)
          </label>
          <input
            {...register("tags")}
            placeholder="nextjs, auth, mongodb"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Featured Image URL
        </label>
        <input
          {...register("image")}
          placeholder="https://example.com"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400 cursor-pointer"
      >
        {loading ? "Publishing Post..." : "Publish Blog"}
      </button>
    </form>
  );
}
