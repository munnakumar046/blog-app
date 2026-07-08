import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await Blog.findById(id).lean();

  if (!blog) return <p>Blog not found</p>;

  return (
    <article className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-60 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
      <p className="text-gray-500">
        By {blog.author} | {new Date(blog.createdAt).toDateString()}
      </p>
      <p className="mt-4">{blog.content}</p>
      <p className="mt-2 text-sm text-gray-600">Category: {blog.category}</p>
      <div className="mt-4">
        <a href="/blogs" className="bg-blue-600 text-white px-4 py-2 rounded">
          Back
        </a>
      </div>
    </article>
  );
}
