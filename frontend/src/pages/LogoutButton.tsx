import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // यह तुम्हारे AuthContext से token/user हटाएगा
    navigate("/login"); // यूज़र को लॉगिन पेज पर ले जाए
  };

  return (
    <button onClick={handleLogout} className="text-red-500 hover:underline">
      Logout
    </button>
  );
}

export default LogoutButton;
