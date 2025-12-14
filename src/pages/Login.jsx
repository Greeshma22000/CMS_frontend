import React, { useState } from 'react'
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = ({setAdmin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!email || !password){
          alert("Please fill all the fields");
          return;
        }
        try {
          const {data} = await API.post("/admin/login", {
            email, 
            password
          });

          localStorage.setItem("admin", JSON.stringify(data));
          setAdmin(data);

          navigate("/")
        } catch (error) {
          console.error(error);
          alert("Invalid credentials");
        }
    }
  return (
    <div className='text-white h-screen flex justify-center items-center bg-cover bg-no-repeat' style={{backgroundImage: "url('https://plus.unsplash.com/premium_vector-1711987786379-aeea5e7e935e?q=80&w=1291&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
      <div>
        <div className='bg-slate-800/40 border-slate-400 rounded-md p-8 shadow-xl backdrop-blur-lg backdrop-opacity-30 relative'>
          <h1 className='text-4xl font-bold text-center mb-6'>Welcome to Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className='relative my-6'>
              <input 
                type="email"
                placeholder='Email...' 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='block w-full py-2.3 text-sm text-white bg-transperent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
              />
              {/* <label htmlFor="" className='absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'> Your Email</label> */}
            </div>
            <div className='relative my-6'>
              <input 
                type="password" 
                placeholder='Password...' 
                value={password}
                onChange={e => setPassword(e.target.value)} 
                className='block w-full py-2.3 text-sm text-white bg-transperent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
              />
              {/* <label htmlFor="">Your Password</label> */}
            </div>
            <button type='submit' className='w-full mb-4 p-2 text-[18px] mt-6 rounded-md bg-emerald-400/70 font-semibold hover:bg-emerald-700'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login