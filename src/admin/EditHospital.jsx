import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CITIES } from "../data/constants"; // 🔹 State hata diya, ab ye mat lo

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditHospital = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null); // 🔹 Original Data Store Karne Ke Liye
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitalData();
  }, []);

  const fetchHospitalData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals/${id}`);
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to load hospital data");

      setFormData(result.data);
      setOriginalData(result.data); // 🔹 Original Data Store Kar Liya
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecialityChange = (e) => {
    const selectedSpecialities = e.target.value.split(",");
    setFormData({ ...formData, speciality: selectedSpecialities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Sirf Wahi Fields Send Jo Change Hue Hain
    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        updatedFields[key] = formData[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      toast.info("No changes detected.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedFields),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update hospital");

      toast.success("Hospital updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">📝 Edit Hospital</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : formData ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              required
              className="border p-2 w-full"
              placeholder="Enter hospital name"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700">City</label>
            <select name="city" value={formData.city || ""} required className="border p-2 w-full" onChange={handleChange}>
              <option value="">Select City</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              required
              className="border p-2 w-full"
              placeholder="Enter address"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700">Speciality</label>
            <input
              type="text"
              name="speciality"
              value={formData.speciality ? formData.speciality.join(", ") : ""}
              required
              className="border p-2 w-full"
              placeholder="Specialities (comma-separated)"
              onChange={handleSpecialityChange}
            />

            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              className="border p-2 w-full"
              placeholder="Enter description"
              onChange={handleChange}
            ></textarea>

            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating !== undefined ? formData.rating : ""}
              className="border p-2 w-full"
              placeholder="Enter rating"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700">Number of Doctors</label>
            <input
              type="number"
              name="numberOfDoctors"
              value={formData.numberOfDoctors !== undefined ? formData.numberOfDoctors : ""}
              className="border p-2 w-full"
              placeholder="Enter number of doctors"
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700">Number of Departments</label>
            <input
              type="number"
              name="numberOfDepartments"
              value={formData.numberOfDepartments !== undefined ? formData.numberOfDepartments : ""}
              className="border p-2 w-full"
              placeholder="Enter number of departments"
              onChange={handleChange}
            />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Save Changes</button>
          </form>
        ) : (
          <p className="text-center text-red-500">Failed to load hospital details.</p>
        )}
      </div>
    </div>
  );
};

export default EditHospital;
