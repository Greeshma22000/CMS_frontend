import { useEffect, useState } from "react";
import API from "../api/api";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* FORM */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={handleSubmit}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Project" : "Add Project"}
        </button>

        {editingId && (
          <button
            onClick={resetForm}
            className="ml-3 text-gray-500"
          >
            Cancel
          </button>
        )}
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow">
            {p.image && (
              <img
                src={`http://localhost:5000${p.image}`}
                alt=""
                className="h-40 w-full object-cover mb-2"
              />
            )}
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => editProject(p)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(p._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;