import React, { useContext } from "react";
import { AuthContext } from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { authToken } = useContext(AuthContext);
  return authToken ? <Outlet /> : <Navigate to={"/"} /> 
};

export default PrivateRoute;