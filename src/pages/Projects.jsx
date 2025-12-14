import { useEffect, useState } from "react";
import API from "../api/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const addProject = async () => {
    await API.post("/projects", { title, description });
    setTitle("");
    setDescription("");
    fetchProjects();
  };

  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>

      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={addProject}>Add</button>

      {projects.map(p => (
        <div key={p._id}>
          <h4>{p.title}</h4>
          <p>{p.description}</p>
          <button onClick={() => deleteProject(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Projects;
