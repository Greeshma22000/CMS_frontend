import { useEffect, useState } from "react";
import API from "../api/api";

const Experience = () => {
  const [items, setItems] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const fetchData = async () => {
    const res = await API.get("/experience");
    setItems(res.data);
  };

  const addItem = async () => {
    await API.post("/experience", { company, role });
    fetchData();
  };

  const deleteItem = async (id) => {
    await API.delete(`/experience/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Experience</h2>

      <input placeholder="Company" onChange={e => setCompany(e.target.value)} />
      <input placeholder="Role" onChange={e => setRole(e.target.value)} />
      <button onClick={addItem}>Add</button>

      {items.map(e => (
        <div key={e._id}>
          {e.company} - {e.role}
          <button onClick={() => deleteItem(e._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Experience;
