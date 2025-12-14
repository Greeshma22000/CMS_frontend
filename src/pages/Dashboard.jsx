import React from 'react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div>
        <Sidebar />
        <div>
            <h1>Hello👋, Welcome to Admin Dashboard </h1>
            <p>Manage your CMS content</p>
        </div>
    </div>
  );
};

export default Dashboard;