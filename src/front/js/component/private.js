import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Private = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("/api/private");
        if (response.ok) {
          setAuthenticated(true);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error while checking authentication:", error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div className="text-white p-5">
      {authenticated ? (
        <h2>This is your private dashboard</h2>
      ) : (
        <h2>Redirecting to login...</h2>
      )}
      <Link to="/" className="btn btn-secondary btn-block mt-3">Go back to Home</Link>
    </div>
  );
};

export default Private;
