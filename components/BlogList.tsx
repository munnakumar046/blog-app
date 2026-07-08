"use client";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

type Blog = {
  _id: string;
  title: string;
  description: string;
  category: string;
  authorName?: string;
  authorId: string; // Document creator identifier definition
  image: string;
  createdAt: string;
};

interface BlogListProps {
  currentUserId?: string; // Prop passed down from server layout context
}

export default function BlogList({ currentUserId }: BlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Network response error.");
        return res.json();
      })
      .then((data) => {
        const blogsArray = Array.isArray(data) ? data : data.blogs || [];
        setBlogs(blogsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError("Could not load database records.");
        setLoading(false);
      });
  }, []);

  async function deleteBlog(id: string) {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // 🔥 CRITICAL FIX: Yeh line backend par secure local cookies automatic carry karke bhejegi
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      const textData = await res.text();
      let result;
      try {
        result = textData ? JSON.parse(textData) : {};
      } catch (parseErr) {
        throw new Error("Invalid server response format.");
      }

      if (!res.ok) {
        alert(result.error || `Action failed with status: ${res.status}`);
        return;
      }

      alert("Blog deleted successfully! 🎉");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err: any) {
      console.error("Delete handler caught:", err);
      alert(err.message || "Something went wrong during deletion.");
    }
  }

  if (loading)
    return (
      <p className="text-center text-gray-500 py-12 italic">
        Loading application items...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 py-12 font-medium">{error}</p>
    );
  if (blogs.length === 0)
    return (
      <p className="text-center text-gray-400 py-12">
        No blogs matching database criteria.
      </p>
    );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
          currentUserId={currentUserId} // Pass context value down to inner validation layer
          onDelete={deleteBlog}
        />
      ))}
    </div>
  );
}
