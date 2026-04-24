import React, { useState, useEffect } from "react";

function BlogForm({ addBlog, editData, updateBlog }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    if (editData) {
      updateBlog({ ...editData, title, description });
    } else {
      addBlog({ title, description });
    }

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button type="submit">
        {editData ? "Update Blog" : "Add Blog"}
      </button>
    </form>
  );
}

export default BlogForm;