import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signin = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  isAuthenticated && navigate("/admin/dashboard");
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/admin/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message ?? "Invalid credentials");
      toast.success("Signin successful!");
      navigate("/admin/dashboard");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isAuthenticated)
    return <p className="text-center text-lg">You are already signed in.</p>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-0">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-4xl font-bold text-blue-600">Hi there!</h2>
          <p className="text-sm text-gray-600">
            Welcome to HospitalHub. Sigin to continue.
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                {/* <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </a> */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div
        className="flex-1 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615770922480-0b9ae80afeba?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
      </div>
    </div>
  );
};

export default Signin;
