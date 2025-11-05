import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App"; // or wherever AuthContext is actually exported from

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useContext(AuthContext);

  return isLogin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
