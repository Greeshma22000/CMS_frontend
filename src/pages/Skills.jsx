import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const fetchSkills = async () => {
    const res = await API.get("/skills");
    setSkills(res.data);
  };

  const addSkill = async () => {
    if(!name.trim() || !level.trim()){
      alert("Skill name and level are required");
      return;
    }
    await API.post("/skills", { name, level });
    setName("");
    setLevel("");
    fetchSkills();
  };

  const deleteSkill = async (id) => {
    await API.delete(`/skills/${id}`);
    fetchSkills();
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="flex min-h-screen bg-blue-300">
      <Sidebar />
      <div className="flex-1 absolute left-70 p-6 md:p-10 mt-5">
        <h2 className="bg-white rounded-2xl text-2xl p-3 font-semibold mb-6 text-blue-800 text-center">
          Skills
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mb-8">
          <div className="space-y-4">
            <input 
              type="text"
              placeholder="Skill Name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input 
              type="text" 
              placeholder="Level" 
              value={level} 
              onChange={e => setLevel(e.target.value)} 
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button 
              onClick={addSkill}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </div>


        <div className="space-y-3 max-w-md">
          {skills.map(skill => (
            <div 
              key={skill._id}
            
            className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm">
              <span className="text-blue-700">
                <strong>{skill.name}</strong>
              </span> {skill.level}
            <button 
              onClick={() => deleteSkill(skill._id)}
              className="text-sm text-red-500 hover:text-red-700 transition"
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

export default Skills;
