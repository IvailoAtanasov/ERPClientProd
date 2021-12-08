import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { SignInPage } from "../Pages/LoginPage/SignInPage";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const isTokenValid = (token) => {
    try {
      const { exp } = jwt_decode(token);
      return Date.now() < exp * 1000 ? true : false;
    } catch (error) {
      return false;
    }
  };

  const auth = () => {
    localStorage.getItem("authToken");
  };

  if (isTokenValid(localStorage.getItem("authToken")))
    return auth ? children : navigate("/login");
  return <SignInPage />;
};
export default PrivateRoute;
