import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { isAuthenticated, signout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🏥 HospitalHub</Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>

          {isAuthenticated ? (
            <>
              <Link to="/admin/dashboard" className="hover:text-gray-200">Dashboard</Link>
              <button onClick={signout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Signout</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-gray-200">Signin</Link>
              <Link to="/signup" className="hover:text-gray-200">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
