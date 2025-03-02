import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signin = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ usernameOrEmail: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/admin/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      toast.success("Signin successful!");
      navigate("/admin/dashboard");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isAuthenticated) return <p className="text-center text-lg">You are already signed in.</p>;

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Signin</h2>
      <form className="bg-white p-6 rounded shadow-lg" onSubmit={handleSubmit}>
        <input type="text" name="usernameOrEmail" placeholder="Username or Email" onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Signin</button>
      </form>
    </div>
  );
};

export default Signin;
