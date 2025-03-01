import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchFilter from "../components/SearchFilter";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [hospitals, setHospitals] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true); 

  const fetchHospitals = async (city = "", speciality = "") => {
    setLoading(true);
    setError(null);
    setHospitals([]); 

    try {
      let url = `${API_BASE_URL}/hospitals`; 

      if (city || speciality) {
        const query = new URLSearchParams();
        if (city) query.append("city", city);
        if (speciality) query.append("speciality", speciality);

        url = `${API_BASE_URL}/hospitals/filter?${query.toString()}`;
      }

      const response = await fetch(url);
      
      if (response.status === 404) { 
        setHospitals([]);
        return;  
      }

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const result = await response.json();
      setHospitals(result.data || []);

      if (!firstLoad) {  
        toast.success("Hospitals loaded successfully!");
      }
    } catch (error) {
      setHospitals([]); 
      if (!firstLoad) {
        toast.error("Error fetching hospitals!");
      }
    } finally {
      setLoading(false);
      setFirstLoad(false); 
    }
  };

  useEffect(() => {
    fetchHospitals(); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="bg-blue-600 text-white text-center py-10">
        <h1 className="text-4xl font-bold">🏥 Find the Best Hospitals Near You</h1>
        <p className="mt-2 text-lg">Search & Explore Top-Rated Hospitals</p>
      </div>

      <div className="container mx-auto p-5">
        <SearchFilter onFilter={fetchHospitals} />

        <h2 className="text-2xl font-semibold text-gray-800 text-center my-6">Available Hospitals</h2>

        {loading ? (
          <p className="text-center text-lg">Loading hospitals...</p>
        ) : hospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <div key={hospital._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <img src={hospital.images[0]} alt={hospital.name} className="w-full h-40 object-cover rounded-md" />

                <h3 className="text-xl font-semibold mt-3">{hospital.name}</h3>
                <p className="text-gray-600">{hospital.city}, {hospital.state}</p>
                <p className="text-gray-700 text-sm mt-1">📍 {hospital.address}</p>

                <Link to={`/hospital/${hospital._id}`}>
                  <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No hospitals found.</p> 
        )}
      </div>
    </div>
  );
};

export default Home;
