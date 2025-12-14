import { useEffect, useState } from "react";
import API from "../api/api";

const Testimonials = () => {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const res = await API.get("/testimonials");
    setList(res.data);
  };

  const addItem = async () => {
    await API.post("/testimonials", { name, message });
    fetchData();
  };

  const deleteItem = async (id) => {
    await API.delete(`/testimonials/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Testimonials</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <textarea placeholder="Message" onChange={e => setMessage(e.target.value)} />
      <button onClick={addItem}>Add</button>

      {list.map(t => (
        <div key={t._id}>
          {t.name}
          <button onClick={() => deleteItem(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
