import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // ✅ .env se API URL le raha hai

const HospitalDetails = () => {
  const { id } = useParams(); // URL se ID le raha hai
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/hospitals/${id}`);
        console.log(response)
        const result = await response.json();
        setHospital(result.data);
      } catch (error) {
        console.error("Error fetching hospital:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading hospital details...</p>;
  if (!hospital) return <p className="text-center mt-10 text-red-500">Hospital not found!</p>;

  return (
    <div className="container mx-auto p-5">
      <Link to="/" className="text-blue-600">&larr; Back to Home</Link>

      <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
        <h1 className="text-3xl font-bold">{hospital.name}</h1>
        <p className="text-gray-600">{hospital.city}, {hospital.state}</p>
        <p className="text-gray-700 mt-2">📍 {hospital.address}</p>

        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < hospital.rating ? "text-yellow-500" : "text-gray-300"}>
              ★
            </span>
          ))}
          <span className="ml-2 text-gray-600">({hospital.rating})</span>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto">
          {hospital.images.map((img, index) => (
            <img key={index} src={img} alt="Hospital" className="w-40 h-40 object-cover rounded-md" />
          ))}
        </div>

        <p className="mt-4 text-gray-700">{hospital.description || "No description available."}</p>
      </div>
    </div>
  );
};

export default HospitalDetails;
