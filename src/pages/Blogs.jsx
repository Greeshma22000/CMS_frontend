import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

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
    <div className="flex min-h-screen bg-blue-300">
      <Sidebar />
      <div className="flex-1 p-6 absolute left-70">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center bg-white p-3 rounded-2xl">Blogs</h2>

        <div className="bg-white p-6 rounded-xl shadow mb-8 space-y-4 max-w-xl">
          <input 
            placeholder="Title" 
            onChange={e => setTitle(e.target.value)} 
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea 
            placeholder="Content" 
            onChange={e => setContent(e.target.value)}
            rows={4}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-indigo-500 resize-none"
          />
          <button 
            onClick={addBlog}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Add
          </button>
        </div>

        <div className="space-y-4">
          {blogs.map(blog => (
            <div 
              key={blog._id}
              className="bg-white p-4 rounded-lg flex justify-between items-center"
            >
            <h4 className="text-lg font-medium text-blue-800">{blog.title}</h4>

            <button 
              onClick={() => deleteBlog(blog._id)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
