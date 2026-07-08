import { NextResponse } from "next/server";
import { auth } from "@/lib/mongodb";
import Blog from "@/models/Blog";

// GET blog by ID
export async function GET(
  req: Request,
  { params }: RouteContext<"/api/blogs/[id]">,
) {
  const { id } = await params;
  // await connectDB();
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 },
    );
  }
}

// UPDATE blog by ID
export async function PUT(
  req: Request,
  { params }: RouteContext<"/api/blogs/[id]">,
) {
  // await connectDB();
  const { id } = await params;
  const body = await req.json();
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update blog" + error?.message },
      { status: 500 },
    );
  }
}

// DELETE blog by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  // await connectDB();
  try {
    const deletedBlog = await Blog.findByIdAndDelete(params.id);
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
