import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Fetch
  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  // Upload Image
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);

    const res = await API.post("/upload", formData);
    return res.data.imageUrl;
  };

  // Add / Update
  const handleSubmit = async () => {
    let imageUrl = "";

    if (image) {
      imageUrl = await uploadImage();
    }

    const payload = { title, description, image: imageUrl };

    if (editingId) {
      await API.put(`/projects/${editingId}`, payload);
    } else {
      await API.post("/projects", payload);
    }

    resetForm();
    fetchProjects();
  };

  // Edit
  const editProject = (p) => {
    setEditingId(p._id);
    setTitle(p.title);
    setDescription(p.description);
  };

  // Delete
  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setEditingId(null);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-blue-300 flex">
  {/* Sidebar */}
  <Sidebar />

  {/* Main Content */}
  <main className="flex-1 p-6 md:p-10 absolute left-70">
    <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center bg-white p-2 rounded-2xl">
      Projects
    </h1>

    {/* FORM */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-lg font-medium text-blue-700 mb-4 text-center">
        {editingId ? "Edit Project" : "Add New Project"}
      </h2>

      <div className="space-y-4">
        <input
          className="w-full rounded-lg border border-blue-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full rounded-lg border border-blue-300 px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg"
          >
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>

    {/* LIST */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-13">
      {projects.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition w-50  overflow-hidden"
        >
          {p.image && (
            <img
              src={`http://localhost:5000${p.image}`}
              alt={p.title}
              className="h-44 w-full object-cover"
            />
          )}

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {p.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
              {p.description}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => editProject(p)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProject(p._id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </main>
</div>

  );
};

export default Projects;