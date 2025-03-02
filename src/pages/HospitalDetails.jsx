import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    background: "transparent",
  },
};

const HospitalDetails = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchHospitalDetails();
  }, []);

  const fetchHospitalDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals/${id}`);
      if (!response.ok) throw new Error("Failed to fetch hospital details");

      const result = await response.json();
      setHospital(result.data);
    } catch (error) {
      setError(error.message);
      toast.error("Error fetching hospital details!");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (img) => {
    setSelectedImage(img);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="container mx-auto p-5">
        {loading ? (
          <p className="text-center text-lg">Loading hospital details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : hospital ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-blue-600">{hospital.name}</h1>
            <p className="text-gray-600 text-lg">{hospital.city}, {hospital.state}</p>
            <p className="text-gray-700 text-md mt-2">📍 {hospital.address}</p>

            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">Specialities</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {hospital.speciality.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">Description</h2>
              <p className="text-gray-700">{hospital.description || "No description provided"}</p>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">Doctors & Departments</h2>
              <p className="text-gray-700">👨‍⚕️ Doctors: {hospital.numberOfDoctors || "N/A"}</p>
              <p className="text-gray-700">🏥 Departments: {hospital.numberOfDepartments || "N/A"}</p>
            </div>

            {hospital.images.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Hospital Images</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hospital.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Hospital ${index}`}
                        className="w-full h-40 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                        onClick={() => openModal(img)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal for Full Screen Image Preview */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
              <img src={selectedImage} alt="Full View" className="max-w-full max-h-screen rounded-md shadow-lg" />
              <button
                className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full"
                onClick={closeModal}
              >
                ✖
              </button>
            </Modal>
          </div>
        ) : (
          <p className="text-center text-gray-600">No hospital details available.</p>
        )}
      </div>
    </div>
  );
};

export default HospitalDetails;
