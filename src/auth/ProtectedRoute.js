// import React from "react";
// import { Route, Navigate, Outlet } from "react-router-dom";

// export default function ProtectedRoute({ component: Component, ...rest }) {
//   const auth_status = true; // Assuming this is your authentication status
//   return (
//     auth_status ? <Outlet /> : <Navigate to="/companies" />
//   );
// }

// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { isAuthenticated, isStudent } from "./isAuthorized";
// import { isAuthenticated } from "./authService";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  //   const auth_status = true;
  const user = isAuthenticated();
  const checkAuth = () => {
    if (!user || !props.allow()) {
      setLoggedIn(false);
      return navigate("/login");
    }
    setLoggedIn(true);
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return isLoggedIn ? props.children : "";
};

export default ProtectedRoute;
