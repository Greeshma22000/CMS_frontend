import { useEffect, useState } from "react";
import API from "../api/api";

const Services = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchServices = async () => {
    const res = await API.get("/services");
    setServices(res.data);
  };

  const addService = async () => {
    await API.post("/services", { title, description });
    fetchServices();
  };

  const deleteService = async (id) => {
    await API.delete(`/services/${id}`);
    fetchServices();
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <h2>Services</h2>

      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <button onClick={addService}>Add</button>

      {services.map(s => (
        <div key={s._id}>
          {s.title}
          <button onClick={() => deleteService(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Services;
