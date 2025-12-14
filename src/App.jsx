import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setAdmin={setAdmin} />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App