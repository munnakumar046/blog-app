import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

// ==========================================
// 1. GET: Fetch All Blogs from Database
// ==========================================
export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: "DB uninitialized" }, { status: 500 });
    }

    const blogsData = await db
      .collection("blogs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(blogsData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ==========================================
// 2. POST: Create a New Blog
// ==========================================
export async function POST(request: NextRequest) {
  try {
    // Better-Auth natively parses cookies directly from request headers
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized operation! Please log in." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { title, description, content, category, image, slug, tags } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and Content fields are required." },
        { status: 400 },
      );
    }

    await connectDB();
    const db = mongoose.connection.db;

    const newBlog = {
      title,
      description: description || "",
      content,
      category: category || "General",
      image: image || "",
      slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
      tags: tags || [],
      authorId: session.user.id,
      authorName: session.user.name,
      createdAt: new Date(),
    };

    const result = await db?.collection("blogs").insertOne(newBlog);
    return NextResponse.json(
      { success: true, blogId: result?.insertedId },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("API POST Error caught:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ==========================================
// 3. PUT: Update an Existing Blog Post
// ==========================================
export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized operation! Please log in." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { id, title, description, content, category, image, slug, tags } =
      body;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required for editing." },
        { status: 400 },
      );
    }

    await connectDB();
    const db = mongoose.connection.db;

    const objectId = new mongoose.Types.ObjectId(id);
    const existingBlog = await db
      ?.collection("blogs")
      .findOne({ _id: objectId });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog post not found." },
        { status: 404 },
      );
    }

    // Security Verification: Only the creator can update their blog
    if (existingBlog.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Access Denied! You can only edit your own blogs." },
        { status: 403 },
      );
    }

    const updatedData: any = {};
    if (title) updatedData.title = title;
    if (description !== undefined) updatedData.description = description;
    if (content) updatedData.content = content;
    if (category) updatedData.category = category;
    if (image !== undefined) updatedData.image = image;
    if (slug) updatedData.slug = slug;
    if (tags) updatedData.tags = tags;
    updatedData.updatedAt = new Date();

    await db
      ?.collection("blogs")
      .updateOne({ _id: objectId }, { $set: updatedData });

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully.",
    });
  } catch (error: any) {
    console.error("API PUT Error caught:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ==========================================
// 4. DELETE: Remove Blog Post Safely
// ==========================================
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized operation! Please log in." },
        { status: 401 },
      );
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required." },
        { status: 400 },
      );
    }

    await connectDB();
    const db = mongoose.connection.db;

    const objectId = new mongoose.Types.ObjectId(id);
    const blog = await db?.collection("blogs").findOne({ _id: objectId });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found." },
        { status: 404 },
      );
    }

    // Security Verification: Only the creator can delete their blog
    if (blog.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Access Denied! You can only delete your own blogs." },
        { status: 403 },
      );
    }

    await db?.collection("blogs").deleteOne({ _id: objectId });
    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error: any) {
    console.error("API DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
