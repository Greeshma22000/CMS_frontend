import { useEffect, useState } from "react";
import API from "../api/api";

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
    <div>
      <h2>Skills</h2>

      <input placeholder="Skill Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Level" value={level} onChange={e => setLevel(e.target.value)} />
      <button onClick={addSkill}>Add</button>

      {skills.map(skill => (
        <div key={skill._id}>
          {skill.name} - {skill.level}
          <button onClick={() => deleteSkill(skill._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Skills;
