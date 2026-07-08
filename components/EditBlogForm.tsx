"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BlogFormData = {
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  image: string;
  tags: string;
};

export default function EditBlogForm({ id }: { id: string }) {
  const { register, handleSubmit, setValue } = useForm<BlogFormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog");
        return res.json();
      })

      .then((data) => {
        console.log("Fetched blog data:", data);
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("content", data.content);
        setValue("category", data.category);
        setValue("author", data.author);
        setValue("image", data.image);
        setValue("tags", data.tags?.join(", ") || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, setValue]);

  async function onSubmit(data: BlogFormData) {
    const tagsArray = data.tags.split(",").map((tag) => tag.trim());

    await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, tags: tagsArray }),
    });

    alert("Blog updated successfully!");
    router.push(`/blogs/${id}`);
  }

  if (loading) return <p>Loading blog data...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white shadow-md p-6 rounded-lg"
    >
      <input
        {...register("title", { required: true })}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("description")}
        placeholder="Short Description"
        className="w-full border p-2 rounded"
      />
      <textarea
        {...register("content", { required: true })}
        placeholder="Content"
        className="w-full border p-2 rounded h-32"
      />
      <input
        {...register("category")}
        placeholder="Category"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("author")}
        placeholder="Author Name"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("image")}
        placeholder="Featured Image URL"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("tags")}
        placeholder="Tags (comma separated)"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Update Blog
      </button>
    </form>
  );
}
