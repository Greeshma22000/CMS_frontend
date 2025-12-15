import { Link } from "react-router-dom";

const Sidebar = () => {

  const SidebarLinks = [
    // {path: "/", title:"Dashboard"},
    {path: "/about", title:"About"},
    {path: "/skills", title:"Skills"},
    {path: "/projects", title:"Projects"},
    {path: "/blogs", title:"Blogs"},
    {path: "/testimonials", title:"Testimonials"},
    {path: "/experience", title:"Experience"},
    {path: "/service", title:"Service"},
  ];
  return (
    <div className="w-64 h-full fixed bg-white shadow-2xl rounded-2xl">
      <nav className="flex flex-col p-8 space-y-8 text-xl font-semibold italic">
        <Link to="/" className="shadow-xl p-2 rounded-2xl border-l-8 border-blue-600 shadow-blue-400/60 border">Dashboard</Link>
        {SidebarLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className="shadow-xl rounded-2xl p-2 shadow-blue-200 hover:shadow-xl hover:p-2 hover:rounded-2xl hover:scale-3d hover:transition-all hover:duration-300 hover:bg-blue-300 hover:text-white"
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar