import React, { useState } from 'react'
import API from '../api/api';

const Login = ({setAdmin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!email || !password){
          alert("Please fill all the fields");
          return;
        }
        try {
          const {data} = await API.post("/admin/login", {email, password});
          localStorage.setItem("admin", JSON.stringify(data));
          setAdmin(data);
        } catch (error) {
          console.error(error);
          alert("Invalid credentials");
        }
    }
  return (
    <div>
        <form onSubmit={handleLogin}>
            <h2>Welcome to Admin Login</h2>
            <input 
              type="email"
              placeholder='Email...' 
              value={email}
              onChange={e => setEmail(e.target.value)} />
            <input 
              type="password" 
              placeholder='Password...' 
              value={password}
              onChange={e => setPassword(e.target.value)} />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login