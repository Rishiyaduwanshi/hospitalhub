import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/admin/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }
      toast.success("Signup request sent! Awaiting admin approval.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-0">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-4xl font-bold text-blue-600">Join Us!</h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            🔔Note: After signing up, your admin signup request will be sent to the Administrator for approval. Once approved, you will receive an account activation link via email.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
              >
                Signup
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Signin
            </Link>
          </p>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615770922480-0b9ae80afeba?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      </div>
    </div>
  );
};

export default Signup;
