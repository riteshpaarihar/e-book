import {
    Home,
    Search,
    User,
    Upload,
    Bell,
    BookOpen,
    ShoppingCart,
    X,
    Menu,
  } from 'lucide-react';
  import { useState } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  
  const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
  
    const navItems = [
      { icon: <Home />, label: "Home", path: "/" },
      { icon: <Search />, label: "Search", path: "/search" },
      { icon: <User />, label: "Profile", path: "/profile" },
      { icon: <Upload />, label: "Upload", path: "/upload" },
      { icon: <Bell />, label: "Notification", path: "/notifications" },
      { icon: <BookOpen />, label: "My Library", path: "/library" },
      { icon: <ShoppingCart />, label: "Add to cart", path: "/cart" },
    ];
  
    return (
      <>
        {/* Hamburger menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-purple-900 p-4 md:hidden z-50 absolute top-4 left-4"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
  
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-purple-100 bg-opacity-30 backdrop-blur-md p-6 flex flex-col gap-8 transform transition-transform duration-300 md:relative md:translate-x-0 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } w-60 z-40`}
        >
          <div className="text-2xl font-bold text-purple-900">X-Pedia</div>
          <nav className="flex flex-col gap-6 text-purple-900 font-medium">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)} // closes sidebar on mobile
                className={`flex items-center gap-3 hover:text-purple-700 transition ${
                  location.pathname === item.path ? "font-bold text-purple-800" : ""
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>
        </aside>
      </>
    );
  };
  
  export default Sidebar;
  