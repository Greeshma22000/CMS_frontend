import React, { useEffect, useState } from 'react'
import API from "../api/api";

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
    <div>
        <h2>About</h2>
        <input type="text" onChange={e => setTitle(e.target.value)} placeholder='Title...'/>
        <textarea placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
        <button onClick={addAbout}>Add</button>

        {
            about.map(item => (
                <div key={item._id}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                </div>
            ))
        }
    </div>
  )
}

export default About