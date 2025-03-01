import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HospitalDetails from "./pages/HospitalDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospital/:id" element={<HospitalDetails />} />  {/* ✅ New Route Added */}
      </Routes>
    </Router>
  );
}

export default App;


