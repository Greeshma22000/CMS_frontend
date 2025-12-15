import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-full fixed bg-white shadow-2xl rounded-2xl">
      <nav className="flex flex-col p-8 space-y-9 text-xl font-semibold italic">
        <Link to="/" className="shadow-xl p-2 rounded-2xl border-l-8 border-blue-600 shadow-blue-400 border">Dashboard</Link>
        <Link to="/about" className="hover:shadow-xl hover:p-2 hover:rounded-2xl hover:scale-3d hover:transition-all hover:duration-300 hover:bg-blue-300 hover:text-white">About</Link>
        <Link to="/skills" className="hover:shadow-xl hover:p-2 hover:rounded-2xl hover:scale-3d hover:transition-all hover:duration-300 hover:bg-blue-300 hover:text-white">Skills</Link>
        <Link to="/projects" className="hover:shadow-xl hover:p-2 hover:rounded-2xl hover:scale-3d hover:transition-all hover:duration-300 hover:bg-blue-300 hover:text-white">Projects</Link>
        <Link to="/blogs" className="hover:shadow-xl hover:p-2 hover:rounded-2xl hover:scale-3d hover:transition-all hover:duration-300 hover:bg-blue-300 hover:text-white">Blogs</Link>
        <Link to="/testimonials" className="hover:shadow-xl hover:p-2 hover:rounded-2xl hover:scale-3d hover:transition-all hover:duration-300 hover:bg-blue-300 hover:text-white">Testimonials</Link>
        <Link to="/experience" className="hover:shadow-xl hover:p-2 hover:rounded-2xl hover:scale-3d hover:transition-all hover:duration-300 hover:bg-blue-300 hover:text-white">Experience</Link>
        <Link to="/services" className="hover:shadow-xl hover:p-2 hover:rounded-2xl hover:scale-3d hover:transition-all hover:duration-300 hover:bg-blue-300 hover:text-white">Services</Link>
      </nav>
    </div>
  )
}

export default Sidebar