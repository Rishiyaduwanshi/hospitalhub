import { useState } from "react";
import { toast } from "react-toastify";

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

      if (!response.ok) {
        throw new Error(result.message || "Signup failed"); // ✅ Backend Se Aaya Message Dikhayenge
      }
      toast.success("Signup successful! Please sign in.");
    } catch (error) {
      toast.error(error.message); // ✅ Backend Ka Actual Error Message Show Hoga
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 border-2 border-gray-200">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Full Name" required className="border p-2 w-full" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required className="border p-2 w-full" onChange={handleChange} />
          <input type="text" name="username" placeholder="Username" required className="border p-2 w-full" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required className="border p-2 w-full" onChange={handleChange} />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
