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
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-0">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-4xl font-bold text-center mt-2">📝 Edit Hospital</h2>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : formData ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-2 my-10">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  required
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter hospital name"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <select
                  name="city"
                  value={formData.city || ""}
                  required
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select City</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  required
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter address"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Speciality</label>
                <input
                  type="text"
                  name="speciality"
                  value={formData.speciality ? formData.speciality.join(", ") : ""}
                  required
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Specialities (comma-separated)"
                  onChange={handleSpecialityChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter description"
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating !== undefined ? formData.rating : ""}
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter rating"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Doctors</label>
                <input
                  type="number"
                  name="numberOfDoctors"
                  value={formData.numberOfDoctors !== undefined ? formData.numberOfDoctors : ""}
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter number of doctors"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Departments</label>
                <input
                  type="number"
                  name="numberOfDepartments"
                  value={formData.numberOfDepartments !== undefined ? formData.numberOfDepartments : ""}
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter number of departments"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <p className="text-center text-red-500">Failed to load hospital details.</p>
          )}
        </div>
      </div>
      <div className="flex-1 bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615770922480-0b9ae80afeba?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        {/* Add any additional content or styling for the right side here */}
      </div>
    </div>
  );
};

export default EditHospital;
