import React from 'react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div>
        <Sidebar />
        <div className='absolute left-70 p-8'>
            <h1 className='font-semibold text-4xl'>Hello👋, <span className=''>Welcome to Admin Dashboard</span></h1>
            <p className='text-lg italic font-bold text-blue-500'>Manage your CMS content</p>
        </div>
    </div>
  );
};

export default Dashboard;