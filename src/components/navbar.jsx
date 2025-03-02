import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { isAuthenticated, signout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">🏥 HospitalHub</Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Navbar Links */}
        <div
          className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 p-5 md:p-0 transition-all duration-300 ${
            isOpen ? "block" : "hidden md:flex"
          }`}
        >
          <Link to="/" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>Contact</Link>

          {isAuthenticated ? (
            <>
              <Link to="/admin/dashboard" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <button
                onClick={() => {
                  signout();
                  setIsOpen(false);
                }}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Signout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>Signin</Link>
              <Link to="/signup" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
