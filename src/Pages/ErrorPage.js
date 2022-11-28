import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <div>
      <h1>404</h1>
    </div>
  );
};

export default ErrorPage;
