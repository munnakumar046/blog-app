import Link from "next/link";

type BlogCardProps = {
  blog: {
    _id: string;
    title: string;
    description: string;
    category: string;
    authorName?: string; // Standard updated naming string
    authorId: string; // Is post ko create karne wale ki ID
    image: string;
    createdAt: string;
  };
  currentUserId?: string; // Current logged-in user ki ID (Passed from parent)
  onDelete: (id: string) => void;
};

export default function BlogCard({
  blog,
  currentUserId,
  onDelete,
}: BlogCardProps) {
  // Authorization check: Kya current user hi is blog ka malik hai?
  const isOwner = currentUserId === blog.authorId;

  return (
    <div className="bg-white shadow-md rounded p-4 border border-gray-100 flex flex-col justify-between">
      <div>
        <img
          src={blog.image || "https://placehold.co"}
          alt={blog.title}
          className="w-full h-40 object-cover rounded"
        />
        <h2 className="text-xl font-bold mt-2 text-gray-800 line-clamp-1">
          {blog.title}
        </h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {blog.description}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-400 mb-3">
          By {blog.authorName || "Anonymous"} |{" "}
          {new Date(blog.createdAt).toDateString()}
        </p>

        <div className="flex justify-between items-center text-sm font-medium pt-2 border-t border-gray-50">
          <Link
            href={`/blogs/${String(blog._id)}`}
            className="text-blue-600 hover:underline"
          >
            Read More
          </Link>

          {/* Condition guard: Sirf owner hi modify kar sakta hai */}
          {isOwner && (
            <div className="flex space-x-3">
              <Link
                href={`/blogs/${blog._id}/edit`}
                className="text-green-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(blog._id)}
                className="text-red-600 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
