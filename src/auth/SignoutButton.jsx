import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const SignoutButton = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signout();
    //clear cokkie
    
    navigate("/signin");
  };

  return (
    <button onClick={handleSignout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
      Signout
    </button>
  );
};

export default SignoutButton;
