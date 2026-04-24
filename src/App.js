import React, { useState } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import "./App.css";

// In React, [] usually refers to an empty dependency array in hooks
// const [blogs, setBlogs] = useState([]);
// This is called array destructuring
// blogs
// This is the state variable
// It stores data (your blog list)
// setBlogs
// This is a function to update blogs
// You MUST use this to change data
// useState([])
// Initial value = empty array []
// Means: “Initially, no blogs”
function App() {
  const [blogs, setBlogs]= useState([]);
  const [editData, setEditData]= useState(null);
// Add Blog
const addBlog= (blog)=> {
  setBlogs([...blogs, {...blog  }]);
// const addBlog = (blog) => {
// This is a function. It receives a blog object
// ...blogs This is called spread operator. It copies all old blogs
// {...blog}  This creates a new blog object.  ...blog copies old data. 

// Delete Blog
};
//Delete Blog
const deleteBlog = (id) => {
  setBlogs(blogs.filter((blog)=> blog.id !== id));
  // What is filter() doing?
  // blogs.filter((blog) => blog.id !== id)
  // It checks each blog one by one 
  // (blog) => blog.id !== id      function(blog) {return blog.id !== id;}
};

  // Edit Blog
  const updateBlog = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    );
    setEditData(null);    
    // setBlogs(newArray); Saves new array Compares with old array Detects change Re-renders UI 
    // map(): Loops through each blog  Creates a new array   Does NOT change original array
    // ternary op   condition ? value1 : value2  If condition true → use value1   Else → use value2
    // What is updateBlog?  This is a function used when: User edits a blog Clicks Update button
  };

  return (
    <div className="container">
      <h1>Blog App</h1>

      <BlogForm
        addBlog={addBlog}
        editData={editData}
        updateBlog={updateBlog}
      />

      <BlogList
        blogs={blogs}
        deleteBlog={deleteBlog}
        setEditData={setEditData}
      />
      <h1>Hello from git</h1>
    </div>
  );
}

export default App;
