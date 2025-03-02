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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">➕ Add Hospital</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Hospital Name *" required className="border p-2 w-full" onChange={handleChange} />
          <select name="city" required className="border p-2 w-full" onChange={handleChange}>
            <option value="">Select City *</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <input type="text" name="address" placeholder="Address *" required className="border p-2 w-full" onChange={handleChange} />
          <input type="text" name="speciality" placeholder="Speciality (comma-separated) *" required className="border p-2 w-full" onChange={handleChange} />
          <textarea name="description" placeholder="Description" className="border p-2 w-full" onChange={handleChange}></textarea>
          <input type="number" name="numberOfDoctors" placeholder="Number of Doctors" className="border p-2 w-full" onChange={handleChange} />
          <input type="number" name="numberOfDepartments" placeholder="Number of Departments" className="border p-2 w-full" onChange={handleChange} />
          <input type="file" multiple accept="image/*" className="border p-2 w-full" onChange={handleFileChange} />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Add Hospital</button>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
