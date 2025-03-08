import { useState } from "react";
import { toast } from "react-toastify";
import { CITIES } from "../data/constants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddHospital = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    speciality: "",
    description: "",
    numberOfDoctors: "",
    numberOfDepartments: "",
    images: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images" && value) {
        Array.from(value).forEach((file) => {
          formDataToSend.append("images", file);
        });
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch(`${API_BASE_URL}/hospitals`, {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add hospital");
      }

      toast.success("Hospital added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-0">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-4xl font-bold text-blue-600 text-center">➕  Add Hospital</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-2">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Hospital Name *"
                required
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <select
                name="city"
                required
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              >
                <option value="">Select City *</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                name="address"
                placeholder="Address *"
                required
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="text"
                name="speciality"
                placeholder="Speciality (comma-separated) *"
                required
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <textarea
                name="description"
                placeholder="Description"
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <input
                type="number"
                name="numberOfDoctors"
                placeholder="Number of Doctors"
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="number"
                name="numberOfDepartments"
                placeholder="Number of Departments"
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Hospital
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615770922480-0b9ae80afeba?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        {/* Add any additional content or styling for the right side here */}
      </div>
    </div>
  );
};

export default AddHospital;
