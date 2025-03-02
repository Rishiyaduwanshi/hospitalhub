import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="bg-blue-600 text-white text-center py-10 shadow-md">
        <h1 className="text-4xl font-bold">🛠️ Admin Dashboard</h1>
        <p className="mt-2 text-lg">Manage Hospitals</p>
      </div>

      <div className="container mx-auto p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Hospitals List</h2>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="🔍 Search Hospitals..."
              className="border p-2 rounded-md w-full md:w-72"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/admin/addHospital">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                ➕ Add Hospital
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading hospitals...</p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">City</th>
                  <th className="p-3">State</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map((hospital) => (
                    <tr key={hospital._id} className="border-b hover:bg-gray-100 transition">
                      <td className="p-3">
                        <img src={hospital.images[0] || "/placeholder.png"} alt={hospital.name} className="w-16 h-16 object-cover rounded" />
                      </td>
                      <td className="p-3">{hospital.name}</td>
                      <td className="p-3">{hospital.city}</td>
                      <td className="p-3">{hospital.state}</td>
                      <td className="p-3 flex space-x-2">
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-600">No hospitals found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
