import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals`, {
        credentials: "include", // ✅ Cookies-Based Auth
      });

      if (!response.ok) throw new Error("Failed to fetch hospitals");

      const result = await response.json();
      setHospitals(result.data || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="bg-blue-600 text-white text-center py-10">
        <h1 className="text-4xl font-bold">🛠️ Admin Dashboard</h1>
        <p className="mt-2 text-lg">Manage Hospitals</p>
      </div>

      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-semibold text-gray-800 text-center my-6">Hospitals List</h2>

        {loading ? (
          <p className="text-center">Loading hospitals...</p>
        ) : hospitals.length > 0 ? (
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">City</th>
                <th className="p-3">State</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital) => (
                <tr key={hospital._id} className="border-b">
                  <td className="p-3">{hospital.name}</td>
                  <td className="p-3">{hospital.city}</td>
                  <td className="p-3">{hospital.state}</td>
                  <td className="p-3 flex space-x-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No hospitals found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
