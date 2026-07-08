import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-600 text-white rounded-lg">
        <h1 className="text-4xl font-bold">Welcome to My Blog App</h1>
        <p className="mt-4 text-lg">Read, Write, and Manage Blogs Easily</p>
        <Link
          href="/create-blog"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-2 rounded font-semibold"
        >
          Create Blog
        </Link>
      </section>

      {/* Featured Blogs Placeholder */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Blogs</h2>
        <p className="text-gray-600">Coming soon...</p>
      </section>
    </div>
  );
}
