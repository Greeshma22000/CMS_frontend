import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

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
    <div className="flex min-h-screen bg-blue-300">
      <Sidebar />
      <div className="flex-1 p-6 absolute left-70">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800 text-center bg-white p-2 rounded-2xl">Testimonials</h2>
        <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-lg">
          <div className="mb-4">
            <input 
              text="text" 
              placeholder="Name" 
              onChange={e => setName(e.target.value)} 
            />
          </div>
          <div>
            <textarea placeholder="Message" onChange={e => setMessage(e.target.value)} />
          </div>

          <button onClick={addItem}>Add</button>
        </div>

        <div>
          {list.map(t => (
            <div key={t._id}>
              {t.name}
            <button onClick={() => deleteItem(t._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
