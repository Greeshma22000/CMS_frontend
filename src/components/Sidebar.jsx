import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-full fixed bg-white shadow-2xl rounded-md">
      <nav className="flex flex-col p-8 space-y-8 text-xl font-semibold">
        <Link to="/" className="shadow p-2">Dashboard</Link>
        <Link to="/about" className="shadow p-2">About</Link>
        <Link to="/skills" className="shadow p-2">Skills</Link>
        <Link to="/projects" className="shadow p-2">Projects</Link>
        <Link to="/blogs" className="shadow p-2">Blogs</Link>
        <Link to="/testimonials" className="shadow p-2">Testimonials</Link>
        <Link to="/experience" className="shadow p-2">Experience</Link>
        <Link to="/services" className="shadow p-2">Services</Link>
      </nav>
    </div>
  )
}

export default Sidebar