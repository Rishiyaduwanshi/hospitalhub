import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import AdminDashboard from "./admin/AdminDashboard";
import AddHospital from "./admin/AddHospital";
import EditHospital from "./admin/EditHospital";
import HospitalDetails from "./pages/HospitalDetails";
import About from "./pages/About";
function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hospital/:id" element={<HospitalDetails />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/addHospital"
            element={
              <ProtectedRoute>
                <AddHospital />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/editHospital/:id"
            element={
              <ProtectedRoute>
                <EditHospital />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
