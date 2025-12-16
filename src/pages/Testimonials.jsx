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
              className="w-full border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus::ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <textarea 
              placeholder="Message" 
              onChange={e => setMessage(e.target.value)} 
              rows={4}
              className="w-full border border-blue-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button onClick={addItem} className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition">Add</button>
        </div>

        <div className="space-y-4 max-w-lg">
          {list.map(t => (
            <div key={t._id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-800">{t.name}</p>
                <p className="text-sm text-blue-600">{t.message}</p>
              </div>
            <button onClick={() => deleteItem(t._id)} className="text-red-600 hover:text-red-700 font-medium">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
