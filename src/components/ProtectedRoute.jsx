import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { id } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // !id && navigate("/");

  return children;
};

export default ProtectedRoute;
