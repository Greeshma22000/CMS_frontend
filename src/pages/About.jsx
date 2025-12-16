import React, { useEffect, useState } from 'react'
import API from "../api/api";
import Sidebar from '../components/Sidebar';

const About = () => {
    const [about, setAbout] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const fetchAbout = async () => {
        const {data} = await API.get("/about");
        setAbout(data);
    };

    const addAbout = async () => {
        if(!title.trim() || !description.trim()){
            alert("Title and Description are required");
            return;
        }
        await API.post("/about", {title, description});
        setTitle("");
        setDescription("");
        fetchAbout();
    };

    const deleteItem = async (id) => {
        await API.delete(`/about/${id}`);
        fetchAbout();
    }
    useEffect(() => {
        fetchAbout();
    }, [])
  return (
    <div className='min-h-screen bg-blue-300'>
        <Sidebar />
        <div className='absolute left-70 mx-auto bg-white rounded-xl shadow-md p-6 text-gray-800 mt-5'>
            <h2 className='text-3xl font-bold text-center mb-6 text-blue-800'>About</h2>
            <div className='space-y-4 mb-8'>
                <input 
                    type="text" 
                    onChange={e => setTitle(e.target.value)} placeholder='Title...'
                    className='w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <textarea 
                    placeholder='Description' 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    className='w-full border border-blue-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <button 
                    onClick={addAbout}
                    className='w-full bg-blue-500 text-white text-lg py-2 rounded-lg font-semibold hover:bg-blue-700 transition'
                >
                    Add
                </button>
            </div>
            <div className='space-y-4'>
                {about.map(item => (
                    <div 
                        key={item._id}
                        className='border border-blue-300 border-b-2 rounded-lg p-4 flex justify-between items-start shadow-md'
                    >
                        <h4 className='text-lg font-semibold text-blue-800'>
                            {item.title}
                        </h4>
                        <p className='text-blue-600 mt-1'>{item.description}</p>
                        <button 
                            onClick={() => deleteItem(item._id)}
                            className='text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default About