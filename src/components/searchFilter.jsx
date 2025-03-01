import { useState } from "react";

const SearchFilter = ({ onFilter }) => {
  const [city, setCity] = useState("");
  const [speciality, setSpeciality] = useState("");

  const handleSearch = () => {
    onFilter(city, speciality); // ✅ Parent (Home.jsx) ko filter values bhejna
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* ✅ City Search */}
      <input
        type="text"
        placeholder="Search by City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
      />

      {/* ✅ Speciality Dropdown */}
      <select
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
      >
        <option value="">Select Speciality</option>
        <option value="Heart">Heart</option>
        <option value="Brain">Brain</option>
        <option value="Kidney">Kidney</option>
        <option value="Liver">Liver</option>
      </select>

      {/* ✅ Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
