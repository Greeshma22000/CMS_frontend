import { useEffect, useState } from "react";
import API from "../api/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogs = async () => {
    const res = await API.get("/blogs");
    setBlogs(res.data);
  };

  const addBlog = async () => {
    if(!title.trim() || !content.trim()){
      alert("Title and content are required");
      return;
    }
    await API.post("/blogs", { title, content });
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    await API.delete(`/blogs/${id}`);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blogs</h2>

      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" onChange={e => setContent(e.target.value)} />
      <button onClick={addBlog}>Add</button>

      {blogs.map(blog => (
        <div key={blog._id}>
          <h4>{blog.title}</h4>
          <button onClick={() => deleteBlog(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
