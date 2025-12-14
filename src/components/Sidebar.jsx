import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
        <Link to="/">Dashboard</Link>
        <Link to="/about">About</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/testimonials">Testimonials</Link>
        <Link to="/experience">Experience</Link>
        <Link to="/services">Services</Link>
    </div>
  )
}

export default Sidebar