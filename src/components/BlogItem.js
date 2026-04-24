import React from "react";

function BlogItem({ blog, deleteBlog, setEditData }) {
  return (
    <div className="blog-item">
      <h3>{blog.title}</h3>
      <p>{blog.description}</p>

      <button onClick={() => setEditData(blog)}>Edit</button>
      <button onClick={() => deleteBlog(blog.id)}>Delete</button>
    </div>
  );
}

export default BlogItem;