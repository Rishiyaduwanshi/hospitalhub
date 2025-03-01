import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import HospitalDetails from "./pages/HospitalDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospital/:id" element={<HospitalDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
