import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, esAdmin } from "../context/AuthContext";

export default function RutaPrivadaAdmin({children}){
  const { usuario } = useAuth();
  if(!usuario || !esAdmin(usuario)){
    return <Navigate to="/login" replace />;
  }
  return children;
}
