import BlogList from "@/components/BlogList";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function BlogsPage() {
  // Better Auth se server-side par active login session token fetch karein
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Blogs</h1>
        {session?.user && (
          <p className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
            Logged in as:{" "}
            <span className="text-blue-600 font-semibold">
              {session.user.name}
            </span>
          </p>
        )}
      </div>

      {/* Dynamic current user ID parameters mapping inside client component */}
      <BlogList currentUserId={session?.user?.id} />
    </div>
  );
}
