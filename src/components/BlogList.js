import React from "react";
import BlogItem from "./BlogItem";

function BlogList({ blogs, deleteBlog, setEditData }) {
  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <BlogItem
            key={blog.id}
            blog={blog}
            deleteBlog={deleteBlog}
            setEditData={setEditData}
          />
        ))
      )}
    </div>
  );
}

export default BlogList;