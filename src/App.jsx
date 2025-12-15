import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Testimonials from './pages/Testimonials';
import Experience from './pages/Experience';
import Services from './pages/Services';

const App = () => {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin"))
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setAdmin={setAdmin} />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route 
          path="/about" 
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/skills" 
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/projects" 
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/blogs" 
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/testimonials" 
          element={
            <ProtectedRoute>
              <Testimonials />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/experience" 
          element={
            <ProtectedRoute>
              <Experience />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/Services" 
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App