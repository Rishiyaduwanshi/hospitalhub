import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // ✅ .env se API URL le raha hai

const Home = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/hospitals`);
        const result = await response.json();
        setHospitals(result.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white text-center py-10">
        <h1 className="text-4xl font-bold">
          🏥 Find the Best Hospitals Near You
        </h1>
        <p className="mt-2 text-lg">Search & Explore Top-Rated Hospitals</p>
      </div>

      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-semibold text-gray-800 text-center my-6">
          Available Hospitals
        </h2>

        {loading ? (
          <p className="text-center text-lg">Loading hospitals...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <div
                key={hospital._id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={hospital.images[0]}
                  alt={hospital.name}
                  className="w-full h-40 object-cover rounded-md"
                />

                <h3 className="text-xl font-semibold mt-3">{hospital.name}</h3>
                <p className="text-gray-600">
                  {hospital.city}, {hospital.state}
                </p>
                <p className="text-gray-700 text-sm mt-1">
                  📍 {hospital.address}
                </p>

                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < hospital.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-gray-600">
                    ({hospital.rating})
                  </span>
                </div>

                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                  <Link to={`/hospital/${hospital._id}`}>View Details</Link>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
