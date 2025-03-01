import { useState } from "react";
import { CITIES, SPECIALITIES } from "../data/constants";

const SearchFilter = ({ onFilter }) => {
  const [city, setCity] = useState("");
  const [speciality, setSpeciality] = useState("");

  const handleSearch = () => {
    onFilter(city, speciality); // ✅ Parent ko filter values bhejna
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
      >
        <option value="">Select City</option>
        {CITIES.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <select
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
      >
        <option value="">Select Speciality</option>
        {SPECIALITIES.map((speciality) => (
          <option key={speciality} value={speciality}>{speciality}</option>
        ))}
      </select>

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
